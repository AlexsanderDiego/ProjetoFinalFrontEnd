import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Table, Space, Button, Modal, Form, Input, message } from "antd";

const TelaUserPerfil = () => {
  
  const [usuarios, setUsuarios] = useState([]);

  const navigate = useNavigate();

  const { user } = useParams();


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://fs01backend.onrender.com/${user}`
        );

        const newItems = [response.data];
        setUsuarios(newItems);
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao obter Nome do usuário logado:", error);
        console.log(user);

        message.error(
          "Erro ao obter ID do usuário logado. Por favor, tente novamente."
        );
      }
    };

    fetchUser();
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
          <Link to={`/${record.usuario}`}>
            <Button type="primary">Cadastrar Link</Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div>
        <h2>Perfil do Usuário {user}</h2>
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
};

export default TelaUserPerfil;
