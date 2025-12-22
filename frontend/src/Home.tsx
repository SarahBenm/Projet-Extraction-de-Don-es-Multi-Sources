import { Link } from "react-router-dom";
import "./App.css";

function Home() {
  return (
    <div className="home-container">
      {/* ===== En-tête ===== */}
      <header className="home-header">
        <h1>Benchmark d’Intégrité Cognitive</h1>
        <h2>CIB-2025 v2.0</h2>

        <p>
          <strong>Université Paris 8</strong> – UFR Mathématiques, Informatique et Technologies
        </p>

        <p>
          <strong>Auteurs :</strong> Benmessai Sarah & Ogab Abdelaziz
        </p>

        <p>
          <strong>Formation :</strong> Master 1 I2A – 2025/2026
        </p>
      </header>

      {/* ===== Objectif ===== */}
      <section className="home-section">
        <h3>Objectif du Projet</h3>
        <p>
          Le <strong>Benchmark d’Intégrité Cognitive (CIB-2025 v2.0)</strong> répond à un
          triple défi institutionnel :
          <strong> performance, souveraineté et pédagogie</strong>.
        </p>
        <p>
          Le protocole évalue non seulement la correction technique,
          mais également la capacité du modèle à expliquer ses réponses,
          à respecter les normes de sécurité et d’accessibilité,
          tout en demeurant économiquement soutenable dans des conditions réelles.
        </p>
      </section>

      {/* ===== Jeux de données ===== */}
      <section className="home-section">
        <h3>Présentation des Jeux de Données</h3>
        <ul>
          <li>
            <strong>Algorithmique & Pédagogie</strong> – 150 exercices évaluant
            la correction du code et la qualité des explications fournies.
          </li>
          <li>
            <strong>Red Team / Sécurité</strong> – 100 prompts malveillants
            testant la robustesse, la protection des données et l’exposition aux vulnérabilités.
          </li>
          <li>
            <strong>Corpus Institutionnel RAG</strong> – 50 documents administratifs (PDF)
            évaluant la véracité factuelle et l’intégrité des citations.
          </li>
          <li>
            <strong>UserSim</strong> – 50 dialogues simulés analysant la clarté,
            le ton pédagogique et la satisfaction utilisateur.
          </li>
        </ul>
      </section>

      {/* ===== Métriques ===== */}
      <section className="home-section">
        <h3>Métriques d’Évaluation (Spectres)</h3>
        <ul>
          <li>
            <strong>Spectre A</strong> – Qualité technique et pédagogique
            Évalue la capacité du modéle à produire un code fonctionnel, structuré et accompagné d'explications pédagogiques adaptées au contexte universitaire.
          </li>
          <li>
            <strong>Spectre B</strong> – Sécurité, conformité et accessibilité
            Analyse les risques de fuite de données personnelles (RGPD), Les vulnérabilités logicielles et la conformité aux normes d'accessibilité (RGAA).
          </li>
          <li>
            <strong>Spectre C</strong> – Fidélité RAG et intégrité académique
            Mesure la capaciité du modèle à respecter les sourcces institutionnelles, à éviter les hallucinations et à produiredes citations vérifiables.
          </li>
          <li>
            <strong>Spectre D</strong> – Viabilité économique
            Évalue la soutenabilité du modèle en conditions réelles à travers la consommation matérielle, la latence et le coût énergétique.
          </li>
        </ul>
      </section>

      {/* ===== Prise de décision ===== */}
      <section className="home-section">
        <h3>Cadre de Décision</h3>
        <p>
          L’évaluation finale repose sur un score global pondéré,
          combiné à un mécanisme de veto strict.
        </p>
        <p>
          Toute défaillance critique en matière de sécurité
          (ex. fuite de données RGPD) entraîne une disqualification immédiate
          du modèle, indépendamment de ses performances sur les autres axes.
        </p>
      </section>

      {/* ===== Navigation ===== */}
      <section className="home-navigation">
        <Link to="/audit" className="primary-button">
          Accéder au tableau d’audit →
        </Link>
      </section>
    </div>
  );
}

export default Home;
