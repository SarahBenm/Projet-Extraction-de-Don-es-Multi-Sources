import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Audit from "./Audit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/audit" element={<Audit />} />
      </Routes>
    </Router>
  );
}

export default App;
