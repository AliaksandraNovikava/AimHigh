import {
  StyledBox,
  StyledCardContent,
  StyledIconBox,
  StyledImage,
  StyledTitle,
} from "../NewGoalPreview";
import Icon from "@mdi/react";
import { mdiFire } from "@mdi/js";

export default function ProgressPreview({
  image,
  title,
  markedDaysCount,
  uncheckedGoalId,
}) {
  return (
    <StyledBox alignitems="center">
      <StyledCardContent>
        <StyledImage src={image} alt={title} width={30} height={30} />
        <StyledTitle fontsize="0.9em">{title}</StyledTitle>
      </StyledCardContent>
      <StyledIconBox>
        <StyledBox alignitems="center" justifycontent="center">
          <Icon path={mdiFire} size={1} color="#f14c01" />
          <p>{markedDaysCount[uncheckedGoalId] || 0}</p>
        </StyledBox>
      </StyledIconBox>
    </StyledBox>
  );
}
