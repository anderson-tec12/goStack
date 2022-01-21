import { FiArrowLeft, FiMail, FiLock, FiUser } from "react-icons/fi";
import { Container, Background, Content } from "./styles";
import LogoImg from "../../assets/logo.svg";

import Input from "../../components/Input";
import Button from "../../components/Button";

const SignUp: React.FC = () => {
  return (
    <Container>
      <Background />
      <Content>
        <img src={LogoImg} alt="GoBarber" />
        <form>
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
        </form>
        <a href="forgot">
          <FiArrowLeft />
          Voltar para logon
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
