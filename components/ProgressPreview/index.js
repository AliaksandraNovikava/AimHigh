import {
  StyledBox,
  StyledCardContent,
  StyledIconBox,
  StyledImage,
  StyledTitle,
} from "../NewGoalPreview";
import Icon from "@mdi/react";
import { mdiCheckBold } from "@mdi/js";

export default function ProgressPreview({ image, title }) {
  return (
    <StyledBox alignitems="center">
      <StyledCardContent>
        <StyledImage src={image} alt={title} width={30} height={30} />
        <StyledTitle fontsize="0.9em">{title}</StyledTitle>
      </StyledCardContent>
      <StyledIconBox>
        <StyledBox alignitems="center">
          <Icon path={mdiCheckBold} size={1} color="#aeaeae" />
          <p>5</p>
        </StyledBox>
      </StyledIconBox>
    </StyledBox>
  );
}
