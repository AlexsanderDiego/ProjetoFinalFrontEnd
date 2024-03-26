import React from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";

const TelaRedefinirSenha = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    // Aqui você pode implementar a lógica para redefinir a senha
    console.log("Valores do formulário:", values);
    message.success("Solicitação de redefinição de senha enviada com sucesso!");
    form.resetFields();
  };

  return (
    <div style={{ width: "300px", margin: "auto", marginTop: "50px" }}>
      <h2>Redefinir Senha</h2>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Por favor, insira seu email!" },
            { type: "email", message: "Por favor, insira um email válido!" },
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          name="nomeUsuario"
          label="Nome de Usuário"
          rules={[
            {
              required: true,
              message: "Por favor, insira seu nome de usuário!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="novaSenha"
          label="Nova Senha"
          rules={[
            { required: true, message: "Por favor, insira sua nova senha!" },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirmarSenha"
          label="Confirmar Senha"
          dependencies={["novaSenha"]}
          rules={[
            { required: true, message: "Por favor, confirme sua senha!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("novaSenha") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("As senhas não coincidem!"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Enviar
          </Button>
          <Button
            type="danger"
            onClick={() => navigate("/")}
          >
            Voltar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TelaRedefinirSenha;
