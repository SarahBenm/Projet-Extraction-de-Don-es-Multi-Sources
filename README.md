# 🎓 CS-Student LLM Benchmark

![Python](https://img.shields.io/badge/Python-3.10%2B-blue)
![Status](https://img.shields.io/badge/Status-In%20Progress-orange)
![Focus](https://img.shields.io/badge/Focus-Education%20%26%20Transparency-purple)

## 📋 Context & Introduction

The evaluation of Large Language Models (LLMs) is crucial for both research and industry. However, existing benchmarks (MLPerf, GLUE, BIG-bench) are often too voluminous, opaque, or computationally expensive for the average student to reproduce or understand fully.

**CS-Student LLM Benchmark** is an original educational project designed to compare LLMs (GPT-4, Claude 3, Gemini, Llama 3, Mistral) specifically on Computer Science tasks.

**The Core Philosophy:**
*   **Pedagogy:** Metrics designed to be understood by students.
*   **Transparency:** Full access to prompts, datasets, and scoring logic.
*   **Reproducibility:** Low-cost protocols that don't require massive clusters.

---

## 🎯 Project Objectives

### Functional Goals
1.  **Define and Implement Metrics:** Focus on prompt sensitivity, plagiarism, pedagogical quality, and robustness.
2.  **Experimental Protocol:** Standardized datasets (Code, Logic, Facts) and automated scoring scripts.
3.  **Visualization:** A web dashboard to compare models visually.

### Non-Functional Goals
*   **Simplicity:** Accessible codebase for CS students.
*   **Ethics:** Evaluation of data privacy policies.
*   **Modularity:** Easy to add new models (e.g., local models via Ollama) or new metrics.

---

## 📊 Metrics & Methodology

We evaluate models based on 5 distinct axes tailored for academic use:

### 1. 🎯 Prompt Sensitivity (Precision)
*   **Goal:** Measure how much a model's answer changes with slight prompt variations.
*   **Method:** n base prompts &times; 3 variants (rewording, punctuation, detail).
*   **Scoring:** Semantic similarity (BERTScore) variance between variations.

### 2. 📝 Plagiarism & Documentation Similarity
*   **Goal:** Detect if the model is merely "regurgitating" training data or official documentation.
*   **Method:** Comparison against a reference corpus (StackOverflow, Official Docs).
*   **Scoring:** Levenshtein distance and Cosine Similarity embeddings.

### 3. 🎓 Pedagogical Quality
*   **Goal:** Assess if the answer helps a student *learn*, rather than just giving the code.
*   **Method:** Scoring based on clarity, completeness, and presence of comments/docstrings.

### 4. 🛡️ Robustness & Variability
*   **Goal:** Test stability against poorly formulated or ambiguous student prompts.
*   **Method:** n "bad" prompts per module run multiple times.
*   **Scoring:** Standard deviation of answers and failure rate.

### 5. ⚙️ Technical Accuracy & Ethics
*   **Technical:** Pass@k on code (HumanEval/MBPP) and Reasoning (GSM8K).
*   **Ethics:** Review of Data Privacy policies, energy transparency, and accessibility.
