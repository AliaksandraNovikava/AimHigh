import SetGoalsStatistics from "@/components/SetGoalsStatistics";
import ActiveGoalsProgress from "@/components/ActiveGoalsProgress";
import { StyledHeading } from "..";

export default function StatisticsPage({ newGoal }) {
  return (
    <>
      <StyledHeading>Statistics</StyledHeading>
      <SetGoalsStatistics />
      <StyledHeading>My progress</StyledHeading>
      <ActiveGoalsProgress newGoalsEntries={newGoal.myNewGoals} />
    </>
  );
}
