import NewGoalsList from "@/components/NewGoalsList";
import { StyledHeading } from "..";

export default function MyGoalsOPage({ newGoal, handleToggleChecked }) {
  return (
    <>
      <StyledHeading>My Goals</StyledHeading>
      <NewGoalsList
        newGoalsEntries={newGoal.myNewGoals}
        handleToggleChecked={handleToggleChecked}
      />
    </>
  );
}
