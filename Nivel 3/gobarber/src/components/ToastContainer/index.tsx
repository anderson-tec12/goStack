import Toast from "./Toast";
import { useTransition, animated } from "react-spring";
import { Container } from "./styles";

import { useCallback } from "react";

interface Props {
  messages: messageProps[];
}

interface messageProps {
  id: string;
  type?: "success" | "error" | "info";
  title: string;
  description?: string;
}

export const ToastContainer: React.FC<Props> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    (message) => message.id,
    {
      from: { right: "-120%", opacity: 0 },
      enter: { right: "0%", opacity: 1 },
      leave: { right: "-120%", opacity: 0 },
    }
  );

  // return <Container>{messages.map(renderToast)}</Container>;

  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} toast={item} style={props}></Toast>
      ))}
    </Container>
  );
};
