import React from "react";
import "./App.css";
import DashBoard from "./components/pages/DashBoard";
import { Route, Routes } from "react-router-dom";
import Finalize from "./components/pages/Finalize";
import Results from "./components/pages/Results";
import NotFound from "./components/pages/notFound/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/finalize/:id" element={<Finalize />} />
        <Route path="/results/:id" element={<Results />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
