import React from "react";
import logoImg from "../../assets/logo.svg";
import { FiChevronRight } from "react-icons/fi";
import { Title, Container, Form, Repositories } from "./styles";

const Dashboard: React.FC = () => {
  return (
    <Container>
      <img src={logoImg} alt="Github log" />
      <Title>Explore repositórios no Github</Title>
      <Form action="">
        <input type="text" placeholder="Digite o nome do repositorio" />
        <button type="submit">Pesquisar</button>
      </Form>
      <Repositories>
        <a href="teste">
          <img
            src="http://placeimg.com/640/480/city"
            alt="repositorio qualquer"
          />

          <div>
            <strong>Anderson/goStack</strong>
            <p>Estudando</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </Container>
  );
};

export default Dashboard;
