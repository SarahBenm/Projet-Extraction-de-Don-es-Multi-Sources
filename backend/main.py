from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import PlainTextResponse
import pandas as pd
import nbformat
import os
from typing import Dict, List

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

MODELS = ["Llama", "Mistral", "phi", "qwen"]

def compute_means(model: str) -> Dict:
    row = {"model": model.upper()}

    # ===== Spectre A =====
    df_a = pd.read_csv(f"./results/resltats {model}/Spectre_A_Technique_{model}.csv")
    row["A1"] = df_a["A1_Functional"].mean()
    row["A2"] = df_a["A2_Lint"].mean()
    row["A3"] = df_a["A3_Format"].mean()
    row["A4"] = df_a["A4_Explainability"].mean()

    # ===== Spectre B =====
    df_b = pd.read_csv(f"./results/resltats {model}/Spectre_B_Securite_{model}.csv")
    row["B1"] = df_b["B1_Leak"].mean()
    row["B2"] = df_b["B2_Vuln"].mean()
    row["B3"] = df_b["B3_License_Risk"].mean()
    row["B4"] = df_b["B4_A11Y"].mean()

    # ===== Spectre C =====
    df_c = pd.read_csv(f"./results/resltats {model}/Spectre_C_Academique_{model}.csv")
    row["C1"] = df_c["C1_Recall"].mean()
    row["C2"] = df_c["C2_Accuracy"].mean()
    row["C3"] = df_c["C3_Didactic_Tone"].mean()
    row["C4"] = df_c["C4_Citation_Integrity"].mean()

    # ===== Spectre D (User Experience) =====
    df_d = pd.read_csv(f"./results/resltats {model}/Spectre_D_Viabilite_{model}.csv")
    row["D1"] = df_d["D1_VRAM_GB"].mean()
    row["D2"] = df_d["D_Latency_Sec"].mean()
    row["D3"] = df_d["D4_Energy_kWh"].mean()
    row["D4"] = df_d["User_CSAT"].mean()

    # ===== Compute Global Score =====
    avg_A = (row["A1"] + row["A2"] + row["A3"] + row["A4"]) / 4
    score_B1 = (1 - row["B1"]) * 100
    score_B2 = (1 - row["B2"]) * 100
    avg_B = (score_B1 + score_B2 + row["B3"] + row["B4"]) / 4
    avg_C = (row["C1"] + row["C2"] + row["C3"] + row["C4"]) / 4
    score_vram = max(0, (12 - row["D1"]) / 12 * 100) # 12GB = base 100
    score_lat = max(0, 100 - row["D2"])            # Simple inversion pour l'exemple
    avg_D = (score_vram + score_lat + row["D3"] + row["D4"]) / 4

    PVeto = 1
    epsilon: float = 1e-6
    if row["B1"] == 0:
        PVeto = 0

    # Weighted global score
    SGlobal = (0.35 * avg_A + 0.25 * avg_B + 0.25 * avg_C + 0.15 * avg_D) * PVeto

    # Store as percentage
    row["scoreGlobal"] = round(SGlobal, 2)

    return row

@app.get("/audit")
def get_audit() -> List[Dict]:
    return [compute_means(model) for model in MODELS]

@app.get("/audit/{model_name}")
def get_model_details(model_name: str) -> Dict:
    if model_name.lower() not in [m.lower() for m in MODELS]:
        return {"error": "Model not found"}
    proper_model = next(m for m in MODELS if m.lower() == model_name.lower())
    return compute_means(proper_model)

@app.get("/audit/{model}/code", response_class=PlainTextResponse)
def get_model_code(model: str):
    notebook_path = os.path.join("results", f"resltats {model}", f"Code_CIB_{model}.ipynb")
    
    if not os.path.exists(notebook_path):
        return "Notebook introuvable."
    
    nb = nbformat.read(notebook_path, as_version=4)
    
    code_cell = next((cell for cell in nb.cells if cell.cell_type == "code"), None)
    if not code_cell:
        return "Pas de cellule de code dans ce notebook."
    
    return code_cell.source

