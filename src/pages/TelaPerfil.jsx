import { Table, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//import css
import "../css/TelaPerfil.css";

const TelaUserPerfil = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [link, setLink] = useState([]);
  const { user } = useParams();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userResponse = await axios.get(
          // `http://localhost:3000/${user}`
          // `https://projetofinalbackend-4c4c.onrender.com/${user}`
          `https://projetofinalbackend-4c4c.onrender.com/${user}`
          );
        const linksUserResponse = await axios.get(
          // `http://localhost:3000/links/usuarios/${userResponse.data.id}`
          `https://projetofinalbackend-4c4c.onrender.com/links/usuarios/${userResponse.data.id}`
        );
        const userDados = {
          id: userResponse.data.id,
          nome: userResponse.data.nome,
          usuario: userResponse.data.usuario,
          email: userResponse.data.email,
        };
        const linkDados = linksUserResponse.data.map((link) => ({
          id: link.id,
          titulo: link.titulo,
          url: link.url,
        }));
        setUsuarios([userDados]);
        setLink(linkDados);
      } catch (error) {
        console.error("Erro ao obter ID do usuário logado:", error);
        console.log("deu erro", usuarios);
        message.error(
          "Erro ao obter ID do usuário logado. Por favor, tente novamente."
        );
      }
    };

    fetchUserId();
  }, []);

  const columnsUsers = [
    {
      title: <strong>Nome</strong>,
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: <strong>Usuário</strong>,
      dataIndex: "usuario",
      key: "usuario",
    },
    {
      title: <strong>Email</strong>,
      dataIndex: "email",
      key: "email",
    },
  ];

  const columnsLink = [
    {
      title: <strong>Link</strong>,
      dataIndex: "url",
      key: "link",
      render: (text) => (
        <a href={text} target="_blank">
          {text}
        </a>
      ),
    },
    {
      title: <strong>Titulo</strong>,
      dataIndex: "titulo",
      key: "titulo",
    },
  ];

  return (
    <>
      <div className="containerGeralPerfil">
        <div
          className="containerPerfil"
          style={{ width: "80%", margin: "auto", marginTop: "50px" }}
        >
          <h2 className="title-perfil">Perfil do Usuário {user}</h2>
          <Table
            className="table-perfil"
            columns={columnsUsers}
            dataSource={usuarios}
            pagination={false}
            rowKey="id"
          />
          <Table
            columns={columnsLink}
            dataSource={link}
            pagination={false}
            rowKey="id"
          />
        </div>
      </div>
    </>
  );
};

export default TelaUserPerfil;
