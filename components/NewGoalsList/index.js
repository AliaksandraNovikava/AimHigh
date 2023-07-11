import styled from "styled-components";
import NewGoalPreview from "../NewGoalPreview";

const StyledList = styled.div`
  padding-bottom: 25px;
`;

const StyledCard = styled.article`
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 15px;
  background-color: #f6f5f8;
  box-shadow: 0 2px 6px rgb(109 94 255 / 10%);
`;

export default function NewGoalsList({ newGoalsEntries }) {
  return (
    <StyledList>
      {newGoalsEntries.map((goal) => (
        <StyledCard key={goal.id}>
          <NewGoalPreview
            image={goal.icon}
            title={goal.name}
            creationDate={goal.creationDate}
          />
        </StyledCard>
      ))}
    </StyledList>
  );
}
