import React, { useCallback, useRef } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";

import * as Yup from "yup";

import Icon from "react-native-vector-icons/Feather";

import { useNavigation } from "@react-navigation/native";

import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";

import Input from "../../components/Input";
import { Button } from "../../components/Button";

import logoImg from "../../assets/logo.png";
import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from "./styles";

import { getValidationErros } from "../../utils/getValidationErros";
import { useAuthProvider } from "../../hooks/AuthContext";

interface SignInFormData {
  email: string;
  password: string;
}

export const SignIn: React.FC = () => {
  const { signIn, user } = useAuthProvider();
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  console.log(user);

  const handleSignIn = useCallback(
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
        // await signIn({ password: data.password, email: data.email });
        // history.push("/dashboard");

        signIn(data);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err as Yup.ValidationError);
          formRef.current?.setErrors(errors);
          return;
        }

        Alert.alert(
          "Erro na autenticação",
          "ocorreu um erro ao fazer login, cheque as credenciais."
        );
      }
    },
    [signIn]
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        enabled
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Faça seu logon</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                name="email"
                icon="mail"
                placeholder="E-mail"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
            </Form>
            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Entrar
            </Button>

            <ForgotPassword onPress={() => {}}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      >
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>Criar uma conta </CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};
