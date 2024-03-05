import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const TelaRedefinirSenha = () => {
  const navigate = useNavigate();
  return (
    <div>
      TelaRedefinirSenha
      <Button
        className="register-button"
        type="danger"
        onClick={() => navigate("/")}
      >
        Voltar
      </Button>
    </div>
  );
};

export default TelaRedefinirSenha;
