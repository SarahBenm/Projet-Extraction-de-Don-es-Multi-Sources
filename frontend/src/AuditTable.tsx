import { Link } from "react-router-dom";


// Type for each row in the table
export type AuditRow = {
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

// Props for the component
type Props = {
  rows: AuditRow[];
};

function AuditTable({ rows }: Props) {
  return (
    <div className="audit-table-container">
      <table className="audit-table">
        <thead>
          <tr>
            <th rowSpan={2}>Modèle</th>
            <th colSpan={4}>Spectre A<br />Qualité & Pédagogie</th>
            <th colSpan={4}>Spectre B<br />Sécurité & Conformité</th>
            <th colSpan={4}>Spectre C<br />RAG & Intégrité</th>
            <th colSpan={4}>Spectre D<br />Viabilité Éco</th>
            <th rowSpan={2}>Score Global</th>
            <th rowSpan={2}>Détails</th>
          </tr>
          <tr>
            <th>A1</th><th>A2</th><th>A3</th><th>A4</th>
            <th>B1</th><th>B2</th><th>B3</th><th>B4</th>
            <th>C1</th><th>C2</th><th>C3</th><th>C4</th>
            <th>D1</th><th>D2</th><th>D3</th><th>D4</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="model-name">{row.model}</td>

              <td>{row.A1.toFixed(2)}</td>
              <td>{row.A2.toFixed(2)}</td>
              <td>{row.A3.toFixed(2)}</td>
              <td>{row.A4.toFixed(2)}</td>

              <td>{row.B1.toFixed(2)}</td>
              <td>{row.B2.toFixed(2)}</td>
              <td>{row.B3.toFixed(2)}</td>
              <td>{row.B4.toFixed(2)}</td>

              <td>{row.C1.toFixed(2)}</td>
              <td>{row.C2.toFixed(2)}</td>
              <td>{row.C3.toFixed(2)}</td>
              <td>{row.C4.toFixed(2)}</td>

              <td>{row.D1.toFixed(2)}</td>
              <td>{row.D2.toFixed(2)}</td>
              <td>{row.D3.toFixed(2)}</td>
              <td>{row.D4.toFixed(2)}</td>

              <td
                className={`global-score ${
                  row.scoreGlobal >= 60 ? "score-high" : "score-low"
                }`}
              >
                {row.scoreGlobal.toFixed(2)}%
              </td>
              <td>
                <Link
                  to={`/model/${row.model.toLowerCase()}`}
                  className="details-link"
                >
                  Voir →
                </Link>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AuditTable;
