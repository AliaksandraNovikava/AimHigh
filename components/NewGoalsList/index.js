import styled from "styled-components";
import NewGoalPreview from "../NewGoalPreview";

export const StyledList = styled.div`
  padding-bottom: 25px;
`;

export const StyledCard = styled.article`
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 15px;
  background-color: #f6f5f8;
  box-shadow: 0 2px 6px rgb(109 94 255 / 10%);
`;

export default function NewGoalsList({ newGoalsEntries, handleToggleChecked }) {
  const uncheckedGoals = newGoalsEntries.filter((goal) => !goal.isChecked);
  return (
    <StyledList>
      {uncheckedGoals.map((goal) => (
        <StyledCard key={goal.id}>
          <NewGoalPreview
            image={goal.icon}
            title={goal.name}
            creationDate={goal.creationDate}
            handleToggleChecked={handleToggleChecked}
            id={goal.id}
            isChecked={goal.isChecked}
          />
        </StyledCard>
      ))}
    </StyledList>
  );
}
