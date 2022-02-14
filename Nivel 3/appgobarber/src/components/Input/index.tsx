import React from "react";
import { TextInputProps } from "react-native";

import { Container, TextInput, Icon } from "./styles";

interface Props extends TextInputProps {
  name: string;
  icon: string;
}

export const Input: React.FC<Props> = ({ name, icon, ...rest }) => {
  return (
    <Container>
      <Icon name={icon} size={20} color="#666360" />

      <TextInput
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        {...rest}
      />
    </Container>
  );
};
