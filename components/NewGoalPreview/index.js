import Image from "next/image";
import styled from "styled-components";
import Icon from "@mdi/react";
import { mdiCheckCircleOutline, mdiCheckCircle } from "@mdi/js";

const StyledTitle = styled.p`
  margin: 0;
`;

const StyledDate = styled.p`
  margin-bottom: 0;
  margin-top: 10px;
  font-size: 0.7em;
  color: #8e8e93;
`;

const StyledBox = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const StyledCardContent = styled.div`
  width: 85%;
  display: flex;
  align-items: center;
`;

const StyledImage = styled(Image)`
  margin-right: 15px;
`;

const StyledIconBox = styled.div`
  width: 15%;
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
    <StyledBox>
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
