import { useCallback, useRef } from "react";
import { FiArrowLeft, FiMail, FiLock, FiUser } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { getValidationErros } from "../../utils/getValidationErros";
import * as Yup from "yup";
import { ValidationError } from "yup";
import { Link } from "react-router-dom";

import { Container, Background, Content, AnimationContainer } from "./styles";
import LogoImg from "../../assets/logo.svg";

import Input from "../../components/Input";
import Button from "../../components/Button";

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required("Nome obrigatório"),
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),
        password: Yup.string().min(6, "No mínimo 6 digitos"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      console.dir(err);

      const errors = getValidationErros(err as ValidationError);
      formRef.current?.setErrors(errors);
      // formRef.current?.setErrors({
      //   name: "Nome Obrigatorio",
      // });
    }
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={LogoImg} alt="GoBarber" />

          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={{
              name: "",
              email: "",
              password: "",
            }}
          >
            <h1>Faça seu cadastro</h1>

            <Input icon={FiUser} name="name" type="text" placeholder="Nome" />
            <Input
              icon={FiMail}
              name="email"
              type="text"
              placeholder="E-email"
            />
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
          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
