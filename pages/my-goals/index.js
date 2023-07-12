import NewGoalsList from "@/components/NewGoalsList";
import { StyledHeading } from "..";

export default function MyGoalsOPage({ newGoal }) {
  return (
    <>
      <StyledHeading>My Goals</StyledHeading>
      <NewGoalsList newGoalsEntries={newGoal.myNewGoals} />
    </>
  );
}
