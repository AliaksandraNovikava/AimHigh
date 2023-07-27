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
  isDeadlineTab,
}) {
  const deadlineDate = parseISO(goal.deadline);
  const daysLeft = differenceInDays(deadlineDate, new Date());

  return (
    <StyledBox alignitems="center">
      <StyledCardContent>
        <StyledImage src={image} alt={title} width={30} height={30} />
        <StyledTitle fontSize="0.9em">{title}</StyledTitle>
      </StyledCardContent>
      {goal.interval && !isDeadlineTab && (
        <StyledIconBox width="15%">
          <StyledBox alignitems="center" justifycontent="space-evenly">
            <Icon path={mdiFire} size={1} color="#f14c01" />
            <p>{markedDaysCount[uncheckedGoalId] || 0}</p>
          </StyledBox>
        </StyledIconBox>
      )}
      {goal.deadline && isDeadlineTab && (
        <StyledIconBox width="35%">
          <StyledBox alignitems="center" justifycontent="space-evenly">
            {daysLeft < 7 ? (
              <Icon path={mdiTimer} size={1} color="#f14c01" />
            ) : (
              <Icon path={mdiTimer} size={1} />
            )}
            <p>D-{daysLeft}</p>
          </StyledBox>
        </StyledIconBox>
      )}
    </StyledBox>
  );
}
