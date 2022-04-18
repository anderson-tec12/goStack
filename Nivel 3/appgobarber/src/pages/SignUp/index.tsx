import React, { useCallback, useRef } from "react";
import * as Yup from "yup";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  Alert,
} from "react-native";

import api from "../../services/api";

import { TextInput } from "react-native";

import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

import Input from "../../components/Input";
import { Button } from "../../components/Button";

import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";

import logoImg from "../../assets/logo.png";
import { Container, Title, BackToSign, BackToSignText } from "./styles";
import { getValidationErros } from "../../utils/getValidationErros";

interface SiggnUpFormData {
  email: string;
  password: string;
  name: string;
}

export const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const handleSignUp = useCallback(
    async (data: SiggnUpFormData) => {
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

        await api.post("users", data);

        Alert.alert(
          "Cadastro realizado com sucesso!",
          "Você já pode fazer login na aplicação"
        );

        navigation.navigate("SignIn");
      } catch (err) {
        console.dir(err);

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err as Yup.ValidationError);
          formRef.current?.setErrors(errors);
          // formRef.current?.setErrors({
          //   name: "Nome Obrigatorio",
          // });

          return;
        }
        Alert.alert("Erro no cadastro", "Ocorreu um erro ao fazer cadastro!");
        // addToast({
        //   title: "Erro no cadastro",
        //   type: "error",
        // });
      }
    },
    [navigation]
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
              <Title>Crie sua conta</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />

              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => passInputRef.current?.focus()}
              />
              <Input
                ref={passInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
            </Form>

            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Entrar
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSign
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon name="arrow-left" size={20} color="#FFF" />
        <BackToSignText>Voltar para logon</BackToSignText>
      </BackToSign>
    </>
  );
};
