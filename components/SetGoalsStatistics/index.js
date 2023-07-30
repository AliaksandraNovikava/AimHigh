import { StyledList, StyledCard } from "../ProposedGoalsList/ProposedGoalsList";
import { StyledTitle } from "../ProposedGoalPreview";
import styled from "styled-components";

const StyledNumber = styled.p`
  font-size: 2.3em;
  margin: 0;
`;

export default function SetGoalsStatistics({ checkedGoals, uncheckedGoals }) {
  return (
    <>
      <StyledList>
        {uncheckedGoals.length === 0 ? (
          <StyledCard backgroundcolor="#fff">
            <StyledNumber>0</StyledNumber>
            <StyledTitle>No goals in progress</StyledTitle>
          </StyledCard>
        ) : (
          <StyledCard backgroundcolor="#fff">
            <StyledNumber>{uncheckedGoals.length}</StyledNumber>
            <StyledTitle>
              {uncheckedGoals.length < 2
                ? "Goal in progress"
                : "Goals in progress"}
            </StyledTitle>
          </StyledCard>
        )}
        {checkedGoals.length === 0 ? (
          <StyledCard backgroundcolor="#fff">
            <StyledNumber>0</StyledNumber>
            <StyledTitle>No goals completed</StyledTitle>
          </StyledCard>
        ) : (
          <StyledCard backgroundcolor="#fff">
            <StyledNumber>{checkedGoals.length}</StyledNumber>
            <StyledTitle>
              {checkedGoals.length < 2 ? "Goal completed" : "Goals completed"}
            </StyledTitle>
          </StyledCard>
        )}
      </StyledList>
    </>
  );
}
