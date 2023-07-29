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
import styled from "styled-components";

const PreviewBox = styled.article`
  display: flex;
`;

const Message = styled.p`
  padding: 10px;
  font-size: 0.9em;
  border-radius: 10px;
  margin: 0;
  ${(props) =>
    props.isintervalmet === "true"
      ? "color: #01b62bba; background-color: #e6ffe6d9;"
      : "color: #ff9999; background-color: #ffefef;"}
`;

export default function ProgressPreview({
  image,
  title,
  markedDaysCount,
  uncheckedGoalId,
  goal,
  isDeadlineTab,
  isIntervalMet,
  showMessage,
  selectedGoalId,
}) {
  const deadlineDate = parseISO(goal.deadline);
  const daysLeft = differenceInDays(deadlineDate, new Date());
  const absoluteDaysLeft = Math.abs(daysLeft);

  return (
    <div>
      <PreviewBox>
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
              <Icon
                path={mdiTimer}
                size={1}
                color={
                  daysLeft >= 7 ? "#000" : daysLeft >= 0 ? "#f14c01" : "#aeaeae"
                }
              />
              {daysLeft >= 0 ? (
                <p>D-{daysLeft}</p>
              ) : (
                <p>D+{absoluteDaysLeft}</p>
              )}
            </StyledBox>
          </StyledIconBox>
        )}
      </PreviewBox>
      {showMessage && goal.id === selectedGoalId && (
        <div alignitems="center" justifycontent="space-evenly">
          <Message isintervalmet={isIntervalMet.toString()}>
            {isIntervalMet
              ? "Congratulations! You have achieved your goal for the set interval."
              : "Keep pushing forward! Success is just around the corner."}
          </Message>
        </div>
      )}
    </div>
  );
}
