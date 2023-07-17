import styled from "styled-components";

const StyledButton = styled.button`
  font-size: 11px;
  padding: 10px 23px;
  background-color: #000;
  color: #fff;
  border-radius: 10px;
  text-align: center;
  font-size: 1em;
`;

export default function Button({ children, onClick }) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}
