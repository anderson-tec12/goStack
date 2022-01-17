import React, { FormEvent, useState } from "react";
import logoImg from "../../assets/logo.svg";
import { api } from "../../services/api";
import { FiChevronRight } from "react-icons/fi";
import { Title, Container, Form, Repositories, Error } from "./styles";

/*
  rocketseat/unform
  facebook/react
*/

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState("");
  const [inputError, setInputError] = useState("");
  const [repositories, setRepositories] = useState<Repository[]>([]);

  async function handleAddRepositories(
    e: FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    if (!newRepo) {
      setInputError("Digite o autor/nome do repositorio");
      return;
    }

    try {
      const { data } = await api.get<Repository>(`repos/${newRepo}`);

      console.log(data);
      setRepositories([...repositories, data]);
      setNewRepo("");
      setInputError("");
    } catch (err) {
      setInputError("Erro na busca por esse repositório");
    }
  }

  function renderRepositories(repository: Repository) {
    return (
      <a href="teste" key={repository.full_name}>
        <img src={repository.owner.avatar_url} alt={repository.owner.login} />

        <div>
          <strong>{repository.full_name}</strong>
          <p>{repository.description}</p>
        </div>

        <FiChevronRight size={20} />
      </a>
    );
  }

  return (
    <Container>
      <img src={logoImg} alt="Github log" />
      <Title>Explore repositórios no Github</Title>
      <Form hasError={!!inputError} onSubmit={handleAddRepositories}>
        <input
          type="text"
          placeholder="Digite o nome do repositorio"
          value={newRepo}
          onChange={({ target }) => setNewRepo(target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>{repositories.map(renderRepositories)}</Repositories>
    </Container>
  );
};

export default Dashboard;
