import {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { IconBaseProps } from "react-icons";
import { useField } from "@unform/core";
import { Container } from "./styled";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<Props> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { error, registerField, fieldName, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [registerField, fieldName]);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    // if(inputRef.current?.value){
    //   setIsFilled(true)
    // }

    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        defaultValue={defaultValue}
        ref={inputRef}
        type="text"
        {...rest}
      />
      {error}
    </Container>
  );
};

export default Input;
