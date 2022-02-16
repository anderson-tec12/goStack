import React, { useEffect, useRef } from "react";
import { TextInputProps } from "react-native";
import { useField } from "@unform/core";

import { Container, TextInput, Icon } from "./styles";

interface Props extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

export const Input: React.FC<Props> = ({ name, icon, ...rest }) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue, fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: "value",
      setValue(ref: any, value: string) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = "";
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, inputValueRef]);

  return (
    <Container>
      <Icon name={icon} size={20} color="#666360" />

      <TextInput
        ref={inputElementRef}
        defaultValue={defaultValue}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        {...rest}
      />
    </Container>
  );
};
