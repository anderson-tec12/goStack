import { FiLogIn } from "react-icons/fi";
import { Container, Background, Content } from "./styles";
import LogoImg from "../../assets/logo.svg";

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={LogoImg} alt="GoBarber" />
        <form>
          <h1>Faça seu logon</h1>

          <input type="text" placeholder="E-email" />
          <input placeholder="Senha" type="password" />

          <button type="submit">Entra</button>

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
