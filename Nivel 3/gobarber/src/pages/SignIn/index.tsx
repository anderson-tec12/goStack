import { useCallback, useRef, useContext } from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { FormHandles } from "@unform/core";

import { getValidationErros } from "../../utils/getValidationErros";

import LogoImg from "../../assets/logo.svg";
import Input from "../../components/Input";
import Button from "../../components/Button";

import AuthContext from "../../context/AuthContext";

import { Container, Background, Content } from "./styles";

const SignIn: React.FC = () => {
  const auth = useContext(AuthContext);
  const formRef = useRef<FormHandles>(null);

  console.log(auth);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),
        password: Yup.string().required("Senha obrigatório"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      console.dir(err);

      const errors = getValidationErros(err as Yup.ValidationError);
      formRef.current?.setErrors(errors);
      // formRef.current?.setErrors({
      //   name: "Nome Obrigatorio",
      // });
    }
  }, []);

  return (
    <Container>
      <Content>
        <img src={LogoImg} alt="GoBarber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
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
        </Form>
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
