import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginaInicial from "./views/paginaInicial";
import Polinomio from "./views/rcrlCircuito/polinomio";

const PrivateRouteTemplateLogin = ({ children }: any) => {
  return { children };
};

const RouteComponent = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PaginaInicial />} />
    </Routes>
    <Routes>
      <Route path="/polinomio" element={<Polinomio />} />
    </Routes>
  </BrowserRouter>
);

export default RouteComponent;
