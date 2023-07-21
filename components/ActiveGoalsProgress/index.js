import { StyledList, StyledCard } from "../NewGoalsList";
import ProgressPreview from "../ProgressPreview";

export default function ActiveGoalsProgress({ newGoalsEntries }) {
  const uncheckedGoals = newGoalsEntries.filter((goal) => !goal.isChecked);
  return (
    <>
      <StyledList>
        {uncheckedGoals.map((goal) => (
          <StyledCard key={goal.id} backgroundcolor="#fff">
            <ProgressPreview image={goal.icon} title={goal.name} />
          </StyledCard>
        ))}
      </StyledList>
    </>
  );
}
