// Audit.tsx
/*import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuditTable from "./AuditTable";
import type { AuditRow } from "./AuditTable";
import axios from "axios";
import "./App.css";

function Audit() {
  const [rows, setRows] = useState<AuditRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch audit data from backend
    axios
      .get<AuditRow[]>("http://127.0.0.1:8000/audit")
      .then((res) => {
        setRows(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Impossible de récupérer les résultats.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <section className="home-navigation">
        <Link to="/" className="secondary-button">
          ← Retour à l’accueil
        </Link>
      </section>

      <h1>CIB-2025 Audit Dashboard</h1>

      {loading && <p>Chargement des résultats...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && <AuditTable rows={rows} />}
    </div>
  );
}

export default Audit;
*/

"use client"

// Audit.tsx
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import AuditTable from "./AuditTable"
import type { AuditRow } from "./AuditTable"
import axios from "axios"
import "./App.css"

function Audit() {
  useEffect(() => {
    document.title = "Audit"
  }, [])

  const [rows, setRows] = useState<AuditRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Fetch audit data from backend
    axios
      .get<AuditRow[]>("http://127.0.0.1:8000/audit")
      .then((res) => {
        setRows(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError("Impossible de récupérer les résultats.")
        setLoading(false)
      })
  }, [])

  return (
    <div className="container">
      <section className="home-navigation">
        <Link to="/" className="secondary-button">
          ← Retour à l’accueil
        </Link>
      </section>

      <h1>CIB-2025 Audit Dashboard</h1>

      {loading && <p>Chargement des résultats...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && <AuditTable rows={rows} />}
    </div>
  )
}

export default Audit
