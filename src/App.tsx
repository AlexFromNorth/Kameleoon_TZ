import React from "react";
import logo from "./logo.svg";
import "./App.css";
import DashBoard from "./components/pages/DashBoard";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        {/* <Route path="about" element={<About />} /> */}
      </Routes>
    </>
  );
}

export default App;
