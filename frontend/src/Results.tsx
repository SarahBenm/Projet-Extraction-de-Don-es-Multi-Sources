"use client"

import { useEffect, useState } from "react"

export default function Results() {
  useEffect(() => {
    document.title = "Résultats"
  }, [])

  const [results, setResults] = useState<any>({})

  useEffect(() => {
    fetch("http://localhost:8000/results")
      .then((res) => res.json())
      .then(setResults)
  }, [])

  return (
    <div className="container">
      <h2>Resultats</h2>

      {Object.entries(results).map(([model, files]: any) => (
        <div key={model} className="home-section">
          <h3>{model}</h3>
          <div className="audit-table-container">
            <table className="audit-table">
              <thead>
                <tr>
                  <th>Fichier</th>
                  <th>Télécharger</th>
                </tr>
              </thead>
              <tbody>
                {files.map((f: any, i: number) => (
                  <tr key={i}>
                    <td className="model-name">{f.name}</td>
                    <td>
                      <a href={`http://localhost:8000${f.url}`} download className="details-link">
                        Télécharger
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}
