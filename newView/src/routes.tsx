import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginaInicial from "./views/paginaInicial";
import Polinomio from "./views/transferencia/polinomio";
import Transferencia from "./views/transferencia/polinomio";
import RlcCircuit from "./views/rlcCircuit";
import MainTemplate from "./components/templates/main";

const PrivateRouteTemplate = ({ children }: any) => (
  <MainTemplate>{children}</MainTemplate>
);

const RouteComponent = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PaginaInicial />} />
    </Routes>
    <Routes>
      <Route path="/transferencia" element={<Transferencia />} />
    </Routes>
    <Routes>
      <Route
        path="/rlcCircuit"
        element={
          <PrivateRouteTemplate>
            <RlcCircuit />
          </PrivateRouteTemplate>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default RouteComponent;
