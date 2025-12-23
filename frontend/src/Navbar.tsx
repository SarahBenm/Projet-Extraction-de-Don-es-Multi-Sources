import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">AuditCIB</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/audit">Audit</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
