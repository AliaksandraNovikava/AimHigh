import Image from "next/image";
import styled from "styled-components";

const StyledTitle = styled.p`
  margin: 0;
`;

const StyledDate = styled.p`
  margin-bottom: 0;
  margin-top: 10px;
  font-size: 12px;
  color: #8e8e93;
`;

const StyledCardContent = styled.div`
  display: flex;
  align-items: center;
`;

const StyledImage = styled(Image)`
  margin-right: 15px;
`;

export default function NewGoalPreview({ image, title, creationDate }) {
  return (
    <StyledCardContent>
      <StyledImage src={image} alt={title} width={35} height={35} />
      <div>
        <StyledTitle>{title}</StyledTitle>
        <StyledDate>Created on {creationDate}</StyledDate>
      </div>
    </StyledCardContent>
  );
}
