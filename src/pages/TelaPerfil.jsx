import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Table, Space, Button, Modal, Form, Input, message } from "antd";

const TelaUserPerfil = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [link, setLink] = useState([{}]);

  const navigate = useNavigate();

  const { user } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          // `https://fs01backend.onrender.com/${user}`
          `http://localhost:3000/links/${user}`
        );

        const respostaLink = await axios.get(
          // `https://fs01backend.onrender.com/${user}`
          `http://localhost:3000/links/usuarios/${response.data.id}`
        );

        console.log(respostaLink.data);
        const newLink = [respostaLink.data];
        setLink(newLink);
        console.log('sss', link[0]);
        const newItems = [response.data];
        setUsuarios(newItems);
      } catch (error) {
        console.error("Erro ao obter Nome do usuário.", error);

        message.error(
          "Erro ao obter Nome do usuário. Por favor, tente novamente."
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
      title: "Botão",
      key: "botao",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/${record.usuario}`}>
            <Button type="primary">Cadastrar Link</Button>
          </Link>
        </Space>
      ),
    },
  ];

  const columnsLink = [
    {
      title: "Link",
      dataIndex: "url",
      key: "link",
    },
    {
      title: "Titulo",
      dataIndex: "titulo",
      key: "titulo",
    },
    {
      title: "Botão",
      key: "botao",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/${record.usuario}`}>
            <Button type="primary">Editar</Button>
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
        <Table
          columns={columnsLink}
          dataSource={link[0]}
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
