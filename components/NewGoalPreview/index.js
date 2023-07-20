import Image from "next/image";
import styled from "styled-components";
import Icon from "@mdi/react";
import { mdiCheckCircleOutline, mdiCheckCircle } from "@mdi/js";

export const StyledTitle = styled.p`
  margin: 0;
  font-size: ${(props) => props.fontsize};
`;

const StyledDate = styled.p`
  margin-bottom: 0;
  margin-top: 10px;
  font-size: 0.7em;
  color: #8e8e93;
`;

export const StyledBox = styled.div`
  display: flex;
  align-items: ${(props) => props.alignitems};
  justify-content: space-between;
`;

export const StyledCardContent = styled.div`
  width: 85%;
  display: flex;
  align-items: center;
`;

export const StyledImage = styled(Image)`
  margin-right: 15px;
`;

export const StyledIconBox = styled.div`
  width: 15%;
  text-align: end;
  cursor: pointer;
  z-index: 10;
  -webkit-tap-highlight-color: transparent;
`;

export default function NewGoalPreview({
  image,
  title,
  creationDate,
  id,
  isChecked,
  handleToggleChecked,
  onOpenModal,
  goal,
}) {
  return (
    <StyledBox alignitems="flex-start">
      <StyledCardContent onClick={() => onOpenModal(goal)}>
        <StyledImage src={image} alt={title} width={35} height={35} />
        <div>
          <StyledTitle>{title}</StyledTitle>
          <StyledDate>Created on {creationDate}</StyledDate>
        </div>
      </StyledCardContent>
      <StyledIconBox onClick={() => handleToggleChecked(id)}>
        {isChecked ? (
          <Icon path={mdiCheckCircle} size={1.1} color="#aeaeae" />
        ) : (
          <Icon path={mdiCheckCircleOutline} size={1.1} color="#aeaeae" />
        )}
      </StyledIconBox>
    </StyledBox>
  );
}
