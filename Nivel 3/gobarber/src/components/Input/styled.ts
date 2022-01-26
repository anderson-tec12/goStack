import styled, { css } from "styled-components";

type ContainerProps = {
  isFocused: boolean;
  isFilled: boolean;
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  background: #232129;
  border: 2px solid #232129;
  border-radius: 10px;
  width: 100%;
  padding: 16px;
  color: #666360;

  & + div {
    margin-top: 8px;
  }

  ${({ isFocused }) =>
    isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}

  ${({ isFilled }) =>
    isFilled &&
    css`
      color: #ff9000;
    `}

  input {
    background: transparent;
    flex: 1;
    border: 0;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;
