import { useCallback, useRef } from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { FormHandles } from "@unform/core";
import { Link } from "react-router-dom";

import { getValidationErros } from "../../utils/getValidationErros";

import LogoImg from "../../assets/logo.svg";
import Input from "../../components/Input";
import Button from "../../components/Button";

import { useAuthProvider } from "../../hooks/AuthContext";
import { useToast } from "../../hooks/ToastContext";

import { Container, Background, Content, AnimationContainer } from "./styles";

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { signIn } = useAuthProvider();
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
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
        await signIn({ password: data.password, email: data.email });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err as Yup.ValidationError);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          title: "Erro na autenticação",
          type: "error",
          description: "ocorreu um erro ao fazer login, cheque as credenciais.",
        });

        // formRef.current?.setErrors({
        //   name: "Nome Obrigatorio",
        // });
      }
    },
    [signIn, addToast]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={LogoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>

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
              Entra
            </Button>

            <a href="forgot">Esqueci minha senha</a>
          </Form>
          <Link to="signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default SignIn;
