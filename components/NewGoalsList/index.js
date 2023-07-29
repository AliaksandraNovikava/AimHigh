import styled from "styled-components";
import NewGoalPreview from "../NewGoalPreview";

export const StyledList = styled.div`
  padding-bottom: 25px;
`;

export const StyledCard = styled.article`
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 15px;
  background-color: ${(props) => props.backgroundcolor};
  box-shadow: ${(props) => props.boxshadow};
`;

export default function NewGoalsList({
  handleToggleChecked,
  onOpenModal,
  uncheckedGoals,
}) {
  return (
    <StyledList>
      {uncheckedGoals.map((goal) => (
        <StyledCard
          key={goal.id}
          backgroundcolor="#f6f5f8"
          boxshadow="0 2px 6px rgb(109 94 255 / 10%)"
        >
          <NewGoalPreview
            image={goal.icon}
            title={goal.name}
            creationDate={goal.creationDate}
            handleToggleChecked={handleToggleChecked}
            id={goal.id}
            isChecked={goal.isChecked}
            onOpenModal={onOpenModal}
            goal={goal}
          />
        </StyledCard>
      ))}
    </StyledList>
  );
}
