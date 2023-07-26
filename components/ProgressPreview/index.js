import {
  StyledBox,
  StyledCardContent,
  StyledIconBox,
  StyledImage,
  StyledTitle,
} from "../NewGoalPreview";
import { differenceInDays, parseISO } from "date-fns";
import Icon from "@mdi/react";
import { mdiFire, mdiTimer } from "@mdi/js";

export default function ProgressPreview({
  image,
  title,
  markedDaysCount,
  uncheckedGoalId,
  goal,
}) {
  console.log(goal.deadline);
  const deadlineDate = parseISO(goal.deadline);
  const daysLeft = differenceInDays(deadlineDate, new Date());
  console.log("Days left:", daysLeft);
  return (
    <StyledBox alignitems="center">
      <StyledCardContent>
        <StyledImage src={image} alt={title} width={30} height={30} />
        <StyledTitle fontsize="0.9em">{title}</StyledTitle>
      </StyledCardContent>
      {goal.interval && (
        <StyledIconBox width="15%">
          <StyledBox alignitems="center" justifycontent="center">
            <Icon path={mdiFire} size={1} color="#f14c01" />
            <p>{markedDaysCount[uncheckedGoalId] || 0}</p>
          </StyledBox>
        </StyledIconBox>
      )}
      {goal.deadline && (
        <StyledIconBox width="35%">
          <StyledBox alignitems="center" justifycontent="center">
            <Icon path={mdiTimer} size={1} color="#f14c01" />
            <p>D-{daysLeft}</p>
          </StyledBox>
        </StyledIconBox>
      )}
    </StyledBox>
  );
}
