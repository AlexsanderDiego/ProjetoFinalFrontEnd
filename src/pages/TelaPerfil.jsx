import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table, Space, Button, Modal, Form, Input, message } from "antd";

const TelaUserPerfil = () => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const user = window.location.pathname.split("/")[1];
    const idLogado = user;
    // puxar nome do usuario logado no backend

    useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(
            `https://fs01backend.onrender.com/usuarios/${idLogado}`
        );
        
        // const newItems = [response.data];
        // setUsuarios(newItems);
        console.log(response.data);

      } catch (error) {
        console.error("Erro ao obter ID do usuário logado:", error);
        
        message.error(
          "Erro ao obter ID do usuário logado. Por favor, tente novamente."
        );
      }
    };

    fetchUserId();
  }, []);

  return (
    <>
    <div>
        <h2>
            Perfil do Usuário

        </h2>
    </div>
    <div>
      TelaUserPerfil
      <Button
        className="register-button"
        type="danger"
        onClick={() => navigate("/")}
      >
        Voltar
      </Button>
    </div>
    </>
  );    

}

export default TelaUserPerfil;
