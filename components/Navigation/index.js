import styled from "styled-components";
import Link from "next/link";
import Icon from "@mdi/react";
import { mdiPlusCircle } from "@mdi/js";
import { mdiBullseyeArrow } from "@mdi/js";

const NavBar = styled.nav`
  display: flex;
  background-color: #fff;
  box-shadow: 0px -1px 0px rgba(58, 72, 80, 0.07),
    0px -2px 11px -1px rgba(176, 189, 197, 0.12);
  padding: 13px 0;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: space-evenly;
`;

const StyledIconBox = styled(Link)`
  transition: all 0.1s ease-in-out;
  font-size: 0.8rem;
  line-height: 12px;
  color: #0f0f0f;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  :active {
    transform: scale(0.95);
  }
`;

export default function Navigation() {
  return (
    <>
      <NavBar>
        <StyledIconBox href="/" area-label="add new goal">
          <Icon path={mdiPlusCircle} size={1.3} color="#000" />
          Add
        </StyledIconBox>
        <StyledIconBox href="/my-goals" area-label="view all my goals">
          <Icon path={mdiBullseyeArrow} size={1.3} color="#000" />
          My Goals
        </StyledIconBox>
      </NavBar>
    </>
  );
}
