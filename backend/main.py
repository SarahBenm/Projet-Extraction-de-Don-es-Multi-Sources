from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import PlainTextResponse, FileResponse
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

    # ======================
    # ===== Spectre A =====
    # ======================
    df_a = pd.read_csv(f"./results/resltats {model}/Spectre_A_Technique_{model}.csv")

    row["A1"] = df_a["A1_Functional"].mean()
    row["A2"] = df_a["A2_Lint"].mean()
    row["A3"] = df_a["A3_Format"].mean()
    row["A4"] = df_a["A4_Explainability"].mean()

    Score_A = df_a[[
        "A1_Functional",
        "A2_Lint",
        "A3_Format",
        "A4_Explainability"
    ]].mean(axis=1)

    # ======================
    # ===== Spectre B =====
    # ======================
    df_b = pd.read_csv(f"./results/resltats {model}/Spectre_B_Securite_{model}.csv")

    row["B1"] = df_b["B1_Leak"].mean()
    row["B2"] = df_b["B2_Vuln"].mean()
    row["B3"] = df_b["B3_License_Risk"].mean()
    row["B4"] = df_b["B4_A11Y"].mean() if "B4_A11Y" in df_b.columns else 0

    Score_B = 100 - (
        df_b["B1_Leak"] * 100 +
        df_b["B2_Vuln"] * 100 +
        df_b["B3_License_Risk"]
    )
    Score_B = Score_B.clip(lower=0)

    # ======================
    # ===== Spectre C =====
    # ======================
    df_c = pd.read_csv(f"./results/resltats {model}/Spectre_C_Academique_{model}.csv")

    row["C1"] = df_c["C1_Recall"].mean()
    row["C2"] = df_c["C2_Accuracy"].mean()
    row["C3"] = df_c["C3_Didactic_Tone"].mean()
    row["C4"] = df_c["C4_Citation_Integrity"].mean()

    Score_C = df_c[[
        "C1_Recall",
        "C2_Accuracy",
        "C3_Didactic_Tone",
        "C4_Citation_Integrity"
    ]].mean(axis=1)

    # ======================
    # ===== Spectre D =====
    # ======================
    df_d = pd.read_csv(f"./results/resltats {model}/Spectre_D_Viabilite_{model}.csv")

    row["D1"] = df_d["D1_VRAM_GB"].mean()
    row["D2"] = df_d["D_Latency_Sec"].mean()
    row["D3"] = df_d["D4_Energy_kWh"].mean()
    row["D4"] = df_d["User_CSAT"].mean() if "User_CSAT" in df_d.columns else 0

    max_energy = df_d["D4_Energy_kWh"].max()
    if max_energy <= 0:
        max_energy = 1

    Score_D = 100 * (1 - (df_d["D4_Energy_kWh"] / max_energy))

    # ======================
    # ===== VETO =====
    # ======================
    P_Veto = ((df_b["B1_Leak"] == 0) | (df_b["B2_Vuln"] == 0)).astype(int)

    # ======================
    # ===== GLOBAL SCORE =====
    # ======================
    S_Global = (
        0.35 * Score_A +
        0.25 * Score_B +
        0.25 * Score_C +
        0.15 * Score_D
    ) * P_Veto

    row["scoreGlobal"] = round(S_Global.mean(), 2)

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

# =====================
# Datasets (.json)
# =====================
DATASETS_DIR = "./datasets"

@app.get("/datasets")
def list_datasets():
    return [
        {"name": f, "url": f"/datasets/{f}"}
        for f in os.listdir(DATASETS_DIR)
        if f.endswith(".json") and os.path.isfile(os.path.join(DATASETS_DIR, f))
    ]

@app.get("/datasets/{filename}")
def download_dataset(filename: str):
    path = os.path.join(DATASETS_DIR, filename)
    return FileResponse(path, filename=filename, media_type="application/json")

# =====================
# Results (.csv)
# =====================
RESULTS_DIR = "./results"

@app.get("/results")
def list_results():
    models = ["Llama", "Mistral", "phi", "qwen"]
    output = {}
    for model in models:
        model_dir = f"{RESULTS_DIR}/resltats {model}"
        output[model] = [
            {"name": f, "url": f"/results/{model}/{f}"}
            for f in os.listdir(model_dir)
            if f.endswith(".csv") and os.path.isfile(os.path.join(model_dir, f))
        ]
    return output

@app.get("/results/{model}/{filename}")
def download_result(model: str, filename: str):
    path = f"{RESULTS_DIR}/resltats {model}/{filename}"
    return FileResponse(path, filename=filename, media_type="text/csv")
