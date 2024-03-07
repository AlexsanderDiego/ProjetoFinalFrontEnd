import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Table, Space, Button, Modal, Form, Input, message } from "antd";

const TelaUserPerfil = () => {
    const navigate = useNavigate();

    const { user } = useParams();

    useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(
            `https://fs01backend.onrender.com/usuarios/usuario/${user}`
        );
        
        const newItems = [response.data];
        setUsuarios(newItems);
        console.log(response.data);

      } catch (error) {
        console.error("Erro ao obter Nome do usuário logado:", error);
        console.log(user)
        
        message.error(
          "Erro ao obter ID do usuário logado. Por favor, tente novamente."
        );
      }
    };

    fetchUserId();
  }, []);

  const columns = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Usuário",
      dataIndex: "usuario",
      key: "usuario",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Links",
      dataIndex: "links",
      key: "links",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/usuarios/usuario/${record.usuario}`}>
          <Button
            type="primary"
          >
            Cadastrar Link
          </Button>
          </Link>
        </Space>
      ),
    },
  ];

  const [usuarios, setUsuarios] = useState([]);
  console.log(usuarios);
  

  return (
    <>
    <div>
        <h2>
            Perfil do Usuário {user}
        </h2>
    </div>
    <div>
      <Table
        columns={columns}
        dataSource={usuarios}
        pagination={false}
        rowKey="id"
      />
    </div>
    <div>
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
