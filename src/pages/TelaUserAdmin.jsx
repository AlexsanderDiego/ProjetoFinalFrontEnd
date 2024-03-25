import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Table, Space, Button, Modal, Form, Input, message } from "antd";

//import css
import "../css/TelaUserAdmin.css";

const TelaUserAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [link, setLink] = useState([]);
  const [modalVisibleUser, setModalVisibleUser] = useState(false);
  const [modalVisibleLink, setModalVisibleLink] = useState(false);
  const [modalVisibleLinkCriar, setModalVisibleLinkCriar] = useState(false);
  const [editandoUsuario, setEditandoUsuario] = useState({});
  const [editandoLink, setEditandoLink] = useState({});
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const idUser = useParams();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userResponse = await axios.get(
          `http://localhost:3000/links/${idUser.id}`
        );
        const linksUserResponse = await axios.get(
          `http://localhost:3000/links/usuarios/${idUser.id}`
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

  //coluna tabela usuario
  const columnsUsers = [
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
      title: "Ações",
      key: "acoes",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEditar(record)}>
            Editar
          </Button>
          <Button type="danger" onClick={() => handleExcluir(record.id)}>
            Excluir
          </Button>
          <Button type="primary" onClick={() => setModalVisibleLinkCriar(true)}>
            Criar Link
          </Button>
          <Link to={"/" + usuarios[0]["usuario"]}>
            <Button type="primary">Ir Perfil</Button>
          </Link>
        </Space>
      ),
    },
  ];

  //coluna tabela link
  const columnsLink = [
    {
      title: "Titulo",
      dataIndex: "titulo",
      key: "titulo",
    },
    {
      title: "Url",
      dataIndex: "url",
      key: "url",
    },
    {
      title: "Ações",
      key: "acoes",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEditarLink(record)}>
            Editar
          </Button>
          <Button type="danger" onClick={() => handleExcluirLink(record.id)}>
            Excluir
          </Button>
        </Space>
      ),
    },
  ];

  //excluir usuario
  const handleExcluir = (usuarioId) => {
    const excluirUsuario = async () => {
      try {
        const confirma = confirm("Deseja apagar usuário?");
        if (confirma) {
          await axios.delete(
            // `https://fs01backend.onrender.com/apagarusuarios/${usuarioId}`
            `http://localhost:3000/apagarusuario/${usuarioId}`
          );
          alert("Usuario excluido com sucesso");
          navigate("/");
        }
      } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        alert("Erro ao excluir usuario. Por favor, tente novamente.");
      }
    };
    excluirUsuario();
  };

  //editar usuario
  const handleEditar = (usuario) => {
    setEditandoUsuario(usuario);
    setModalVisibleUser(true);
  };

  //editar usuario
  const handleSalvarEdicao = () => {
    form
      .validateFields()
      .then((values) => {
        const editaUsuario = async () => {
          try {
            const resposta = await axios.put(
              // `https://fs01backend.onrender.com/usuarios/${editandoUsuario.id}`,
              `http://localhost:3000/atualizarusuarios/${editandoUsuario.id}`,
              values
            );

            alert("Usuario editado com sucesso");

            // Atualiza a lista de usuários após a edição
            const response = await axios.get(
              // `https://fs01backend.onrender.com/usuarios/${idUser.id}`
              `http://localhost:3000/usuarios/${idUser.id}`
            );
            // implementar a atualização da lista de usuários
            const usu = {
              id: response.data.id,
              nome: response.data.nome,
              usuario: response.data.usuario,
              email: response.data.email,
              links: response.data.links,
            };
            const newItems = [usu];
            setUsuarios(newItems);
          } catch (error) {
            console.error("Erro na requisição:", error);

            alert(
              "Erro ao editar dado do usuario. Por favor, tente novamente."
            );
          }

          setModalVisibleUser(false);
        };
        editaUsuario();
      })
      .catch((error) => {
        console.error("Erro ao validar campos do formulário:", error);
      });
  };

  //cancelar edição usuario
  const handleCancelarEdicao = () => {
    setModalVisibleUser(false);
  };

  //criar link
  const handleCriarLink = () => {
    form
      .validateFields()
      .then((values) => {
        const criarLink = async () => {
          try {
            const resposta = await axios.post(
              `http://localhost:3000/cadastrarlinks/`,
              values
            );

            alert("Link criado com sucesso");

            // Atualiza a lista de usuários após a criação do link
            const linksUserResponse = await axios.get(
              `http://localhost:3000/links/usuarios/${idUser.id}`
            );
            const linkDados = linksUserResponse.data.map((link) => ({
              id: link.id,
              titulo: link.titulo,
              url: link.url,
            }));
            setLink(linkDados);
          } catch (error) {
            console.error("Erro na requisição:", error);

            alert("Erro ao criar link. Por favor, tente novamente.");
          }

          setModalVisibleLinkCriar(false);
        };
        criarLink();
      })
      .catch((error) => {
        console.error("Erro ao validar campos do formulário:", error);
      });
  };

  //cancelar criação link
  const handleCancelarCriarLink = () => {
    setModalVisibleLinkCriar(false);
  };

  //excuir link
  const handleExcluirLink = (linkId) => {
    const excluirLink = async () => {
      try {
        const confirma = confirm("Deseja apagar link?");
        if (confirma) {
          await axios.delete(`http://localhost:3000/apagarlink/${linkId}`);
          alert("Link excluido com sucesso");
          const linksUserResponse = await axios.get(
            `http://localhost:3000/links/usuarios/${idUser.id}`
          );
          const linkDados = linksUserResponse.data.map((link) => ({
            id: link.id,
            titulo: link.titulo,
            url: link.url,
          }));
          setLink(linkDados);
        }
      } catch (error) {
        console.error("Erro ao excluir link:", error);
        alert("Erro ao excluir link. Por favor, tente novamente.");
      }
    };
    excluirLink();
  };

  //editar link
  const handleEditarLink = (link) => {
    setEditandoLink(link);
    setModalVisibleLink(true);
  };

  //editar link
  const handleSalavarEditarLink = () => {
    form
      .validateFields()
      .then((values) => {
        const linkId = Number(values.usuariosId);
        values.usuariosId = linkId;
        const editarLink = async () => {
          try {
            const resposta = await axios.put(
              `http://localhost:3000/atualizarlink/${editandoLink.id}`,
              values
            );

            alert("Link editado com sucesso");

            // Atualiza a lista de usuários após a edição
            const linksUserResponse = await axios.get(
              `http://localhost:3000/links/usuarios/${idUser.id}`
            );
            const linkDados = linksUserResponse.data.map((link) => ({
              id: link.id,
              titulo: link.titulo,
              url: link.url,
            }));
            setLink(linkDados);
            form.resetFields();
          } catch (error) {
            console.error("Erro na requisição:", error);

            alert("Erro ao editar link. Por favor, tente novamente.");
          }

          setModalVisibleLink(false);
        };
        editarLink();
      })
      .catch((error) => {
        console.error("Erro ao validar campos do formulário:", error);
      });
  };

  //cancelar edição link
  const handleCancelarEditarLink = () => {
    //limpar formulario
    form.resetFields();
    setModalVisibleLink(false);
  };

  return (
    <>
    <div className="containerGeralAdmin">
      <div
        className="containerAdmin"
        style={{ width: "80%", margin: "auto", marginTop: "50px" }}
      >
        <h2 className="titleAdmin">Detalhes do usuário</h2>
        <Table
          dataSource={usuarios}
          columns={columnsUsers}
          rowKey="id"
          pagination={false}
        />
        <h2 className="titleAdmin">Links do usuário</h2>
        <Table
          dataSource={link}
          columns={columnsLink}
          rowKey="id"
          pagination={false}
        />
        <br />
        <Button
          className="register-button"
          type="danger"
          onClick={() => navigate("/")}
        >
          Sair
        </Button>

        <Modal
          title="Criar Link"
          open={modalVisibleLinkCriar}
          onOk={handleCriarLink}
          onCancel={handleCancelarCriarLink}
        >
          <Form form={form} initialValues={""}>
            <Form.Item
              name="titulo"
              label="Título"
              rules={[
                {
                  required: true,
                  message: "Por favor, insira o título do link!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="url"
              label="URL"
              rules={[{ required: true, message: "Por favor, insira a URL!" }]}
            >
              <Input type="URL" />
            </Form.Item>
            <Form.Item
              name="usuariosId"
              label="Usuarios Id"
              initialValue={idUser.id}
            >
              <Input readOnly />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Editar Link"
          open={modalVisibleLink}
          onOk={handleSalavarEditarLink}
          onCancel={handleCancelarEditarLink}
        >
          <Form form={form} initialValues={editandoLink}>
            <Form.Item
              name="titulo"
              label="Título"
              rules={[
                {
                  required: true,
                  message: "Por favor, insira o título do link!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="url"
              label="URL"
              rules={[{ required: true, message: "Por favor, insira a URL!" }]}
            >
              <Input type="URL" />
            </Form.Item>
            <Form.Item name="usuariosId" label="Usuarios Id">
              <Input readOnly />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Editar Usuário"
          open={modalVisibleUser}
          onOk={handleSalvarEdicao}
          onCancel={handleCancelarEdicao}
        >
          <Form form={form} initialValues={editandoUsuario}>
            <Form.Item
              name="nome"
              label="Nome"
              rules={[{ required: true, message: "Por favor, insira o nome!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Por favor, insira o email!" },
                {
                  type: "email",
                  message: "Por favor, insira um email válido!",
                },
              ]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item
              name="usuario"
              label="Usuario"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      </div>
    </>
  );
};

export default TelaUserAdmin;
