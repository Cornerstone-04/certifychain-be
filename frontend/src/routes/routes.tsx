import Home from "@/pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
