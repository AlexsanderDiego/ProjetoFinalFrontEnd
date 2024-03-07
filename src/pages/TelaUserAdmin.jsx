import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Table, Space, Button, Modal, Form, Input, message } from "antd";

const TelaUserAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [editandoUsuario, setEditandoUsuario] = useState({});
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const idUser = useParams();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(
          `https://fs01backend.onrender.com/usuarios/${idUser.id}`
        );
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
        console.error("Erro ao obter ID do usuário logado:", error);
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
          <Button type="primary" onClick={() => setModalVisible1(true)}>
            Criar Link
          </Button>
        </Space>
      ),
    },
  ];

  const handleEditar = (usuario) => {
    setEditandoUsuario(usuario);
    setModalVisible(true);
  };

  const handleExcluir = (usuarioId) => {
    const excluirUsuario = async () => {
      try {
        const resposta = await axios.delete(
          `https://fs01backend.onrender.com/apagarusuarios/${usuarioId}`
        );
        console.log("Resposta do servidor:", resposta.values);
        alert("Usuario excluido com sucesso");

        // Atualiza a lista de usuários após a exclusão
        const response = await axios.get(
          `https://fs01backend.onrender.com/usuarios/${idUser.id}`
        );
        // implementar a atualização da lista de usuários
      } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        alert("Erro ao excluir usuario. Por favor, tente novamente.");
      }
    };
    excluirUsuario();
  };

  const handleSalvarEdicao = () => {
    form
      .validateFields()
      .then((values) => {
        const editaUsuario = async () => {
          try {
            const resposta = await axios.put(
              `https://fs01backend.onrender.com/usuarios/${editandoUsuario.id}`,
              values
            );

            alert("Usuario editado com sucesso");

            // Atualiza a lista de usuários após a edição
            const response = await axios.get(
              `https://fs01backend.onrender.com/usuarios/${idUser.id}`
            );
            // implementar a atualização da lista de usuários
          } catch (error) {
            console.error("Erro na requisição:", error);

            alert(
              "Erro ao editar dado do usuario. Por favor, tente novamente."
            );
          }

          setModalVisible(false);
          message.success("Dado editado com sucesso!");
        };
        editaUsuario();
      })
      .catch((error) => {
        console.error("Erro ao validar campos do formulário:", error);
      });
  };

  const handleCancelarEdicao = () => {
    setModalVisible(false);
  };

  const handleCriarLink = () => {
    form
      .validateFields()
      .then((values) => {
        const criarLink = async () => {
          try {
            // const resposta = await axios.post(
            //   `https://fs01backend.onrender.com/usuarios/${idUser.id}/links`,
            //   values
            // );
            
            alert("Link criado com sucesso");

            // Atualiza a lista de usuários após a criação do link
            // const response = await axios.get(
            //   `https://fs01backend.onrender.com/usuarios/${idUser.id}`
            // );
            // implementar a atualização da lista de usuários
          } catch (error) {
            console.error("Erro na requisição:", error);

            alert("Erro ao criar link. Por favor, tente novamente.");
          }

          setModalVisible1(false);
          message.success("Link criado com sucesso!");
        };
        criarLink();
      })
      .catch((error) => {
        console.error("Erro ao validar campos do formulário:", error);
      });
  }

  const handleCancelarCriarLink = () => {
    setModalVisible1(false);
  };
  
  return (
    <>
      <div style={{ width: "80%", margin: "auto", marginTop: "50px" }}>
        <h2>Detalhes do usuário</h2>
        <Table dataSource={usuarios} columns={columns} rowKey="id" pagination={false}/>
        <Button
          className="register-button"
          type="danger"
          onClick={() => navigate("/")}
        >
          Sair
        </Button>

        //Modal para criar links para o usuario
        <Modal
          title="Criar Link"
          open={modalVisible1}
          onOk={handleCriarLink}
          onCancel={handleCancelarCriarLink}
        >
          <Form form={form} initialValues={""}>
            <Form.Item
              name="Título"
              label="Título"
              rules={[{ required: true, message: "Por favor, insira o título do link!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="URL"
              label="URL"
              rules={[
                { required: true, message: "Por favor, insira a URL!" },
              ]}
            >
              <Input type="URL" />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Editar Usuário"
          open={modalVisible}
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
    </>
  );
};

export default TelaUserAdmin;
