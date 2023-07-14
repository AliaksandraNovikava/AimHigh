import NewGoalsList from "@/components/NewGoalsList";
import { StyledHeading } from "..";

export default function MyGoalsOPage({
  newGoal,
  handleToggleChecked,
  checkedGoals,
}) {
  return (
    <>
      <StyledHeading>My Goals</StyledHeading>
      <NewGoalsList
        newGoalsEntries={newGoal.myNewGoals}
        handleToggleChecked={handleToggleChecked}
        checkedGoals={checkedGoals}
      />
    </>
  );
}
