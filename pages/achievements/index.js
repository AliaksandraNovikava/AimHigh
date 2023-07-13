import { StyledHeading } from "..";
import AchievementsList from "@/components/AchievementsList";

export default function MyGoalsOPage({ checkedGoals }) {
  return (
    <>
      <StyledHeading>My Achievements</StyledHeading>
      <AchievementsList checkedGoals={checkedGoals} />
    </>
  );
}
