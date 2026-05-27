import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ElProblema from "./pages/ElProblema";
import Actua from "./pages/Actua";
import Directorio from "./pages/Directorio";
import Actualidad from "./pages/Actualidad";
import Nosotros from "./pages/Nosotros";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="el-problema" element={<ElProblema />} />
          <Route path="actua" element={<Actua />} />
          <Route path="directorio" element={<Directorio />} />
          <Route path="actualidad" element={<Actualidad />} />
          <Route path="nosotros" element={<Nosotros />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
