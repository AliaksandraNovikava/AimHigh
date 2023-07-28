import { StyledList, StyledCard } from "../NewGoalsList";
import ProgressPreview from "../ProgressPreview";

export default function Deadlines({ uncheckedGoals }) {
  const goalsWithDeadline = uncheckedGoals.filter((goal) => goal.deadline);

  return (
    <>
      <StyledList>
        {goalsWithDeadline.map((goal) => (
          <StyledCard
            key={goal.id}
            backgroundcolor="#fff"
            boxshadow="0 2px 6px rgb(109 94 255 / 10%)"
          >
            <ProgressPreview
              image={goal.icon}
              title={goal.name}
              uncheckedGoalId={goal.id}
              goal={goal}
              isDeadlineTab={true}
            />
          </StyledCard>
        ))}
      </StyledList>
    </>
  );
}
