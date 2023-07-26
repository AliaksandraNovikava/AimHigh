import { StyledList, StyledCard } from "../NewGoalsList";
import ProgressPreview from "../ProgressPreview";

export default function Deadlines({ uncheckedGoals }) {
  return (
    <>
      <StyledList>
        {uncheckedGoals.map((goal) =>
          goal.deadline ? (
            <StyledCard key={goal.id} backgroundcolor="#fff">
              <ProgressPreview
                image={goal.icon}
                title={goal.name}
                uncheckedGoalId={goal.id}
                goal={goal}
              />
            </StyledCard>
          ) : null
        )}
      </StyledList>
    </>
  );
}
