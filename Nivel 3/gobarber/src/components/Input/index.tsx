import { InputHTMLAttributes } from "react";
import { IconBaseProps } from "react-icons";
import { Container } from "./styled";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<Props> = ({ icon: Icon, ...rest }) => {
  return (
    <Container>
      {Icon && <Icon size={20} />}
      <input type="text" {...rest} />
    </Container>
  );
};

export default Input;
