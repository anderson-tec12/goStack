import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Container, Background, Content } from "./styles";
import LogoImg from "../../assets/logo.svg";

import Input from "../../components/Input";
import Button from "../../components/Button";

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={LogoImg} alt="GoBarber" />
        <form>
          <h1>Faça seu logon</h1>

          <Input icon={FiMail} name="email" type="text" placeholder="E-email" />
          <Input
            icon={FiLock}
            name="password"
            placeholder="Senha"
            type="password"
          />

          <Button name="teste" data-biscoito={1} type="submit">
            Entra
          </Button>

          <a href="forgot">Esqueci minha senha</a>
        </form>
        <a href="forgot">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
