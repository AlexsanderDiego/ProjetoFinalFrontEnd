import { Button, Col, Flex, Form, Input, Row } from "antd";
import FormItem from "antd/es/form/FormItem/index.js";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

//import do css
import "../css/TelaLogin.css";

function AuthLogin() {
  
  const navigate = useNavigate();

  async function login(dados) {
    try {
      // const resposta = await axios.post("https://fs01backend.onrender.com/auth/login", dados);
      // const resposta = await axios.post("https://projetofinalbackend-4c4c.onrender.com/auth/login", dados);
      const resposta = await axios.post("http://localhost:3000/auth/login", dados);

      console.log("Resposta do login:", resposta.data);
      navigate("/admin/" + resposta.data.id);
      alert("Login Autorizado");
    } catch (error) {
      alert("Erro ao fazer login. Por favor, tente novamente.");
    }
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
                <Link to="/cadastro">
                <Button type="primary">
                  Cadastrar novo usuário
                </Button>
                </Link>
              </Form.Item>
            </Col>
            <Col>
              <FormItem>
              <Link to="/redefinirsenha">
                <Button type="danger">
                  <span className="btnEsqueciSenha">Esqueceu sua senha?</span>
                </Button>
                </Link>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Flex>
    </>
  );
}

export default AuthLogin;
