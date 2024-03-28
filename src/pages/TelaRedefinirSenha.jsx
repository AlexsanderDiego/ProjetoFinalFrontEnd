import React from "react";
import { Form, Input, Button, message, Row, Col, Flex } from "antd";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import FormItem from "antd/es/form/FormItem/index.js";


const TelaRedefinirSenha = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const {user} = useParams();

  const handleSubmit = async (values) => {
    // Aqui você pode implementar a lógica para redefinir a senha
    const respostaUser = await axios.get(`http://localhost:3000/${user}`);
    const idUser = Number(respostaUser.data.id);

console.log(idUser)
    const response = await axios.put(`http://localhost:3000/atualizarsenha/${idUser}`, values);
    if (response.status !== 200) {
      message.error("Erro ao redefinir a senha. Por favor, tente novamente.");
      return;
    }

    console.log("Valores do formulário:", values);
    message.success("Solicitação de redefinição de senha enviada com sucesso!");
    form.resetFields();
  };

  return (
    <>
      <Flex className="login-container">
        <Form className="login-form" layout="vertical" onFinish={handleSubmit}>
          <div className="login-form-title">Redefinir Senha</div>
          <Row gutter={[16, 16]}>
            <Col span={24}>
            <Form.Item
                name="usuario"
                label="Usuario"
                rules={[{ required: true }]}
              >
                <Input />
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
                  Alterar senha
                </Button>
              </Form.Item>
            </Col>
            <Col>
            </Col>
            <Col>
              <FormItem>
              <Link to="/">
                <Button type="danger">
                  <span className="btnEsqueciSenha">Voltar</span>
                </Button>
                </Link>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Flex>
    </>
  );
};

export default TelaRedefinirSenha;
