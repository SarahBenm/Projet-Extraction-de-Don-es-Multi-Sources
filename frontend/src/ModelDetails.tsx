import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// Type for a model's details
type ModelDetailsType = {
  model: string;

  // Spectre A
  A1: number;
  A2: number;
  A3: number;
  A4: number;

  // Spectre B
  B1: number;
  B2: number;
  B3: number;
  B4: number;

  // Spectre C
  C1: number;
  C2: number;
  C3: number;
  C4: number;

  // Spectre D
  D1: number;
  D2: number;
  D3: number;
  D4: number;

  scoreGlobal: number;
};

function ModelDetails() {
  const { model } = useParams<{ model: string }>();
  const [data, setData] = useState<ModelDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!model) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8000/audit/${model}`);
        const json = await res.json();
        if (json.error) {
          setError(json.error);
        } else {
          setData(json);
        }
      } catch (err) {
        setError("Impossible de charger les détails du modèle.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [model]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return null;

  return (
    <div className="model-details">
      <h2>Détails du modèle : {data.model}</h2>

      <table>
        <thead>
          <tr>
            <th>Spectre</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>A (Qualité & Pédagogie)</td>
            <td>{data.A1.toFixed(2)}</td>
            <td>{data.A2.toFixed(2)}</td>
            <td>{data.A3.toFixed(2)}</td>
            <td>{data.A4.toFixed(2)}</td>
          </tr>
          <tr>
            <td>B (Sécurité & Conformité)</td>
            <td>{data.B1.toFixed(2)}</td>
            <td>{data.B2.toFixed(2)}</td>
            <td>{data.B3.toFixed(2)}</td>
            <td>{data.B4.toFixed(2)}</td>
          </tr>
          <tr>
            <td>C (RAG & Intégrité)</td>
            <td>{data.C1.toFixed(2)}</td>
            <td>{data.C2.toFixed(2)}</td>
            <td>{data.C3.toFixed(2)}</td>
            <td>{data.C4.toFixed(2)}</td>
          </tr>
          <tr>
            <td>D (Viabilité)</td>
            <td>{data.D1.toFixed(2)}</td>
            <td>{data.D2.toFixed(2)}</td>
            <td>{data.D3.toFixed(2)}</td>
            <td>{data.D4.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={4}>
              <strong>Score global : {data.scoreGlobal.toFixed(2)}%</strong>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Section for code / output */}
      <div className="model-code">
        <h3>Code utilisé pour l'évaluation</h3>
        <pre>
          {`# Ici vous pouvez afficher le code ou la sortie du modèle
# Exemple: df_a.head(), df_b.describe(), etc.`}
        </pre>
      </div>

      <Link to="/audit">← Retour à l'audit</Link>
    </div>
  );
}

export default ModelDetails;
