import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Audit from "./Audit";
import ModelDetails from "./ModelDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/audit" element={<Audit />} />
        <Route path="/model/:model" element={<ModelDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
