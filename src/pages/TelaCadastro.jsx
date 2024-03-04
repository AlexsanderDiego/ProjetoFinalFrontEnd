import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Button, Row, Col, Flex } from "antd";
import AuthLogin from "./TelaLogin.jsx";

import "../css/TelaCadastro.css";

function Cadastro() {
  const [irLogin, setIrLogin] = useState(null);
  const [form] = Form.useForm();

  async function handleSubmit(dados) {
    try {
      const resposta = await axios.post("https://fs01backend.onrender.com/cadastrarusuarios", dados);
    
      alert("Usuario Cadastrado");

      // limpar campos do formulario apos cadastro e perguntar se deseja cadastrar novo usuario ou voltar para tela de login  
      const confirma = confirm("Deseja cadastrar novo usuário?");
      if (confirma) {
        setIrLogin(false);
        // limpar campos
        form.resetFields();
      } else {
        setIrLogin(true);
      }

    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao cadastrar usuario. Por favor, tente novamente.");
    }
  }

  if (irLogin) {
    return <AuthLogin />;
  }

  return (
    <>
      <Flex className="register-container">
        <Form className="register-form" form={form} onFinish={handleSubmit}>
          <div className="register-form-title">Cadastro</div>
          <Row>
            <Col>
              <Form.Item
                name="nome"
                label="Nome"
                rules={[
                  { required: true, message: "Por favor, insira seu nome!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Por favor, insira seu email!" },
                  {
                    type: "email",
                    message: "Por favor, insira um email válido!",
                  },
                ]}
              >
                <Input type="email" />
              </Form.Item>
            </Col>

            <Col>
              <Form.Item
                name="usuario"
                label="Usuario"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col>
              <Form.Item
                name="senha"
                label="Senha"
                rules={[
                  { required: true, message: "Por favor, insira sua senha!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button
                  className="register-button"
                  type="primary"
                  htmlType="submit"
                >
                  Cadastrar
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  className="register-button"
                  type="danger"
                  onClick={() => setIrLogin(true)}
                >
                  Voltar
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Flex>
    </>
  );
}

export default Cadastro;
