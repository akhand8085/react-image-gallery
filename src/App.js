import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Gallery from "./components/gallery";
import ImageDetail from "./components/ImageDetail";
import './App.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/image/:id" element={<ImageDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

