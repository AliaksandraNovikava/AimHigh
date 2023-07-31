import styled from "styled-components";

export const StyledButton = styled.button`
  font-size: 11px;
  padding: 10px 23px;
  background-color: ${(props) => props.backgroundcolor};
  color: #fff;
  border-radius: 10px;
  border: ${(props) => props.border};
  text-align: center;
  font-size: 1em;
`;

export default function Button({ children, onClick }) {
  return (
    <StyledButton onClick={onClick} backgroundcolor="#000">
      {children}
    </StyledButton>
  );
}
