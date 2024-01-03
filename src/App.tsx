import React from "react";
import "./App.css";
import DashBoard from "./components/pages/DashBoard";
import { Route, Routes } from "react-router-dom";
import Finalize from "./components/pages/Finalize";
import Results from "./components/pages/Results";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/finalize" element={<Finalize />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </>
  );
}

export default App;
