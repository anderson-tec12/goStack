import { FiArrowLeft, FiMail, FiLock, FiUser } from "react-icons/fi";
import { Form } from "@unform/web";

import { Container, Background, Content } from "./styles";
import LogoImg from "../../assets/logo.svg";

import Input from "../../components/Input";
import Button from "../../components/Button";

const SignUp: React.FC = () => {
  function handleSubmit(data: object) {
    console.log(data);
  }

  return (
    <Container>
      <Background />
      <Content>
        <img src={LogoImg} alt="GoBarber" />

        <Form
          onSubmit={handleSubmit}
          initialData={{
            name: "Anderson",
            email: "",
            password: "",
          }}
        >
          <h1>Faça seu cadastro</h1>

          <Input icon={FiUser} name="name" type="text" placeholder="Nome" />
          <Input icon={FiMail} name="email" type="text" placeholder="E-email" />
          <Input
            icon={FiLock}
            name="password"
            placeholder="Senha"
            type="password"
          />

          <Button name="teste" data-biscoito={1} type="submit">
            Cadastrar
          </Button>
        </Form>
        <a href="forgot">
          <FiArrowLeft />
          Voltar para logon
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
