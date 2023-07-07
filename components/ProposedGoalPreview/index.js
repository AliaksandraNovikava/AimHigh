import Image from "next/image";
import styled from "styled-components";

const StyledTitle = styled.p`
  margin-bottom: 0;
`;

export default function ProposedGoalPreview({ image, title }) {
  return (
    <>
      <div>
        <Image src={image} alt={title} width={40} height={40} />
        <StyledTitle>{title}</StyledTitle>
      </div>
    </>
  );
}
