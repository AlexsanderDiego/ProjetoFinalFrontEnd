import { Button, Col, Flex, Form, Input, Row } from "antd";
import axios from "axios";
import React from "react";

import { Link, useNavigate } from "react-router-dom";
import "../css/TelaCadastro.css";

function Cadastro() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  async function handleSubmit(dados) {
    try {
      await axios.post(
        // "https://fs01backend.onrender.com/cadastrarusuarios",
        `http://localhost:3000/cadastrarusuarios/`,
        dados
      );

      alert("Usuario Cadastrado");

      // limpar campos do formulario apos cadastro e perguntar se deseja cadastrar novo usuario ou voltar para tela de login
      const confirma = confirm("Deseja cadastrar novo usuário?");
      if (confirma) {
        // limpar campos
        form.resetFields();
      } else {
        navigate("/");
        
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao cadastrar usuario. Por favor, tente novamente.");
    }
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
                <Link to="/">
                  <Button className="register-button" type="danger">
                    Voltar
                  </Button>
                </Link>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Flex>
    </>
  );
}

export default Cadastro;
