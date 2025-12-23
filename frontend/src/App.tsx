import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Home"
import Audit from "./Audit"
import ModelDetails from "./ModelDetails"
import Navbar from "./Navbar"
import Datasets from "./Datasets"
import Results from "./Results"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/audit" element={<Audit />} />
        <Route path="/datasets" element={<Datasets />} />
        <Route path="/results" element={<Results />} />
        <Route path="/model/:model" element={<ModelDetails />} />
      </Routes>
    </Router>
  )
}

export default App
