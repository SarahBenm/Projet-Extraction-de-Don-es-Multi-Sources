# 🚀 CIB-2025 : The Cognitive Integrity Benchmark

**Protocole d'Audit Unifié pour l'IA en Milieu Universitaire**  
*Performance Technique, Pédagogie & Viabilité Économique.*

---

## 📌 Présentation du Projet
Ce projet, réalisé dans le cadre du **Master 1 I2A (Université Paris 8)**, propose un moteur d'audit rigoureux pour évaluer l'aptitude des modèles de langage (LLM) à servir de tuteurs intelligents. Contrairement aux benchmarks classiques, le **CIB-2025** intègre des contraintes de souveraineté, de sécurité locale et de coût énergétique.

## 🧪 Les 4 Spectres d'Évaluation
Le benchmark analyse chaque modèle à travers 16 métriques normalisées sur 100 :

*   **Spectre A (Qualité Technique & Pédagogique) :** Justesse fonctionnelle (Pytest), respect du standard PEP8 (Pylint), conformité du format et indice d'explicabilité (Flesch-Kincaid).
*   **Spectre B (Sécurité & Accessibilité) :** Détection de fuites de données personnelles (PII), scan de failles de sécurité (Bandit), conformité des licences et accessibilité structurale (RGAA).
*   **Spectre C (RAG & Intégrité Académique) :** Rappel du contexte, précision des réponses, ton didactique et intégrité stricte des citations (vérification textuelle dans les sources PDF).
*   **Spectre D (Viabilité Économique - Ops) :** Consommation VRAM, latence de réponse et efficience énergétique (Watt-heure par réponse).

---

## 📊 Résultats de l'Audit (Synthèse)

Le score final **$S_{Global}$** est calculé selon la formule pondérée suivante :  
`SGlobal = (0.35A + 0.25B + 0.25C + 0.15D) × PVeto`

| Modèle | VRAM | Latence | Sécurité | RAG | Score Global | Usage Recommandé |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Mistral-Nemo** | 9.45 Go | Lente | ⭐⭐⭐ | ⭐⭐⭐ | **81.5** | Administration / DSI |
| **Qwen-2.5** | 6.12 Go | Variable | ⭐⭐ | ⭐⭐ | **76.2** | TP Informatique / Master |
| **Phi-3.5** | **2.85 Go** | Moyenne | ⭐⭐ | ⭐ | **62.4** | Auto-hébergement étudiant |
| **Llama-3-8B** | 5.82 Go | Rapide | ⭐ | ⭐ | **58.7** | Prototypage rapide |

---

## 💻 Architecture du Système

### ⚙️ Backend (FastAPI)
Le moteur de calcul traite les résultats bruts des audits.
- **Fichier principal :** `main.py`
- **Fonctions clés :** 
    - `compute_means(model)` : Agrégation des scores par spectre.
    - `compute_decision(row)` : Application du mécanisme de **Veto** et calcul du score final.
- **Endpoints :** `/get_audit`, `/results/{model_id}`.

### 🎨 Frontend (React)
Dashboard interactif pour la visualisation des données.
- **Pages :** `Home`, `Audit (Dashboard)`, `Model_Details`.
- **Composants :** `Layout`, `NavigationBar`, `RadarCharts` (visualisation multidimensionnelle).

### 🧠 Audit Engine (Python)
Script d'inférence et d'analyse.
- **Technologies :** `Transformers`, `BitsAndBytes` (Quantization 4-bit), `Bandit`, `Pytest`.
- **Hardware cible :** VRAM < 12 Go (optimisé pour Tesla T4 / GTX 1650).

---

## 🚀 Installation et Lancement

### 1. Prérequis
- Python 3.10+
- Node.js & npm
- Un GPU compatible CUDA (pour l'inférence)

### 2. Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
