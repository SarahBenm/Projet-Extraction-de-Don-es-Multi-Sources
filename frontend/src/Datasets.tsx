"use client"

import { useEffect, useState } from "react"

export default function Datasets() {
    
  useEffect(() => {
    document.title = "Datasets"
  }, [])

  const [datasets, setDatasets] = useState<any[]>([])

  useEffect(() => {
    fetch("http://localhost:8000/datasets")
      .then((res) => res.json())
      .then(setDatasets)
  }, [])

  return (
    <div className="container">
      <h2>Datasets</h2>
      <div className="audit-table-container">
        <table className="audit-table">
          <thead>
            <tr>
              <th>Dataset</th>
              <th>Télécharger</th>
            </tr>
          </thead>
          <tbody>
            {datasets.map((d, i) => (
              <tr key={i}>
                <td className="model-name">{d.name}</td>
                <td>
                  <a href={`http://localhost:8000${d.url}`} download className="details-link">
                    Télécharger
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
