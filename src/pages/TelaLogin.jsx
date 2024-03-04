import { Button, Col, Flex, Form, Input, Row } from "antd";
import FormItem from "antd/es/form/FormItem/index.js";
import { useState } from "react";

import axios from "axios";

import Cadastro from "./TelaCadastro";
import TelaRedefinirSenha from "./TelaRedefinirSenha.jsx";
import TelaUserAdmin from "./TelaUserAdmin.jsx";

//import do css
import "../css/TelaLogin.css";

function AuthLogin() {
  const [telaAdmin, setTelaAdmin] = useState(null);
  const [telaCadastro, setTelaCadastro] = useState(null);
  const [telaRedefinirSenha, setTelaRedefinirSenha] = useState(null);
  const [userId, setUserId] = useState(null);

  async function login(dados) {
    try {
      const resposta = await axios.post("https://fs01backend.onrender.com/auth/login", dados);
      // const resposta = await axios.post(
      //   "http://localhost:8080/auth/login",
      //   dados
      // );

      console.log("Resposta do login:", resposta.data);
      setTelaAdmin(true);
      alert("Login Autorizado");
      setUserId(resposta.data.id)
    } catch (error) {
      alert("Erro ao fazer login. Por favor, tente novamente.");
    }
  }

  if (telaAdmin) {
    return <TelaUserAdmin idLogado={userId}/>;
  }
  if (telaCadastro) {
    return <Cadastro />;
  }
  if (telaRedefinirSenha) {
    return <TelaRedefinirSenha />;
  }

  function RedefinirSenha() {
    setTelaRedefinirSenha(true);
  }

  function TelaCadastro() {
    setTelaCadastro(true);
  }

  return (
    <>
      <Flex className="login-container">
        <Form className="login-form" layout="vertical" onFinish={login}>
          <div className="login-form-title">Login</div>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Por favor, insira seu email!" },
                  {
                    type: "email",
                    message: "Por favor, insira um email válido!",
                  },
                ]}
              >
                <Input type="email" placeholder="Digite seu email" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Senha"
                name="senha"
                rules={[
                  { required: true, message: "Por favor, insira sua senha!" },
                ]}
              >
                <Input.Password placeholder="Digite sua senha" />
              </Form.Item>
            </Col>

            <Col>
              <Form.Item>
                <Button
                  className="login-button"
                  type="primary"
                  htmlType="submit"
                >
                  Entrar
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button type="primary" onClick={TelaCadastro}>
                  Cadastrar novo usuário
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <FormItem>
                <Button type="danger" onClick={RedefinirSenha}>
                  <span className="btnEsqueciSenha">Esqueceu sua senha?</span>
                </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Flex>
    </>
  );
}

export default AuthLogin;
