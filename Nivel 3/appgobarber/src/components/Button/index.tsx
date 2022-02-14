import React from "react";
import { RectButtonProperties } from "react-native-gesture-handler";
import { Container, ButtonText } from "./styles";

interface Props extends RectButtonProperties {
  children: string;
}

export const Button: React.FC<Props> = ({ children, ...Rest }) => {
  return (
    <Container {...Rest}>
      <ButtonText>{children}</ButtonText>
    </Container>
  );
};
