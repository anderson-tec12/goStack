import { useEffect } from "react";
import {
  FiAlertCircle,
  FiXCircle,
  FiInfo,
  FiCheckCircle,
} from "react-icons/fi";
import { useToast } from "../../../hooks/ToastContext";
import { Container } from "./styles";

interface ToastProps {
  toast: {
    id: string;
    type?: "success" | "error" | "info";
    title: string;
    description?: string;
  };
  style: object;
}

const icons = {
  info: <FiInfo size="24" />,
  error: <FiAlertCircle size="24" />,
  success: <FiCheckCircle size="24" />,
};

const Toast: React.FC<ToastProps> = ({ toast: message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => removeToast(message.id), 3000);

    return () => {
      console.log("NÂO EXISTE MAIS");
      clearTimeout(timer);
    };
  }, [message.id, removeToast]);

  return (
    <Container
      hasDescription={!!message.description}
      type={message.type}
      style={style}
    >
      {icons[message.type || "info"]}
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>
      <button type="button" onClick={() => removeToast(message.id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
