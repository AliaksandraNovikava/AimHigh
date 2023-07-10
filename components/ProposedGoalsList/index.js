import ProposedGoalPreview from "../ProposedGoalPreview/index.js";
import styled from "styled-components";

const StyledList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  padding-bottom: 25px;
`;

const StyledCard = styled.article`
  padding: 20px;
  border-radius: 15px;
  background-color: ${(props) => props.backgroundcolor};
  box-shadow: 0 2px 6px rgb(109 94 255 / 10%);
`;

export default function ProposedGoalsList({
  goals,
  categoryColors,
  onOpenModal,
}) {
  return (
    <>
      <StyledList>
        {goals.map((goal) => (
          <StyledCard
            key={goal.id}
            backgroundcolor={categoryColors[goal.category]}
            onClick={() => onOpenModal(goal)}
          >
            <ProposedGoalPreview image={goal.icon} title={goal.name} />
          </StyledCard>
        ))}
      </StyledList>
    </>
  );
}
