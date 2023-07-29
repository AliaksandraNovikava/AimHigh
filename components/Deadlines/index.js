import { StyledList, StyledCard } from "../NewGoalsList";
import { EmptyStateMessage } from "@/pages/statistics";
import ProgressPreview from "../ProgressPreview";

export default function Deadlines({ uncheckedGoals }) {
  const goalsWithDeadline = uncheckedGoals.filter(
    (goal) => goal.deadline !== null
  );

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
              goalsWithDeadline={goalsWithDeadline}
            />
          </StyledCard>
        ))}
        {goalsWithDeadline.length === 0 && (
          <div>
            <EmptyStateMessage>No deadlines set yet.</EmptyStateMessage>
          </div>
        )}
      </StyledList>
    </>
  );
}
