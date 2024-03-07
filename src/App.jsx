import { Route, Routes } from "react-router-dom";
import AuthLogin from "./pages/TelaLogin";
import TelaUserAdmin from "./pages/TelaUserAdmin";
import TelaRedefinirSenha from "./pages/TelaRedefinirSenha";
import TelaCadastro from "./pages/TelaCadastro";
import TelaUserPerfil from "./pages/TelaPerfil";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AuthLogin />} />
        <Route path="/admin/:id" element={<TelaUserAdmin />} />
        <Route path="/redefinirsenha" element={<TelaRedefinirSenha />} />
        <Route path="/usuarios/usuario/:user" element={<TelaUserPerfil />} />
        <Route path="/cadastro" element={<TelaCadastro />} />
      </Routes>
    </div>
  );
}

export default App;
