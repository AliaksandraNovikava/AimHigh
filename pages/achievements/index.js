import { StyledHeading } from "..";
import AchievementsList from "@/components/AchievementsList";

export default function MyGoalsOPage({ checkedGoals, handleToggleChecked }) {
  return (
    <>
      <StyledHeading>My Achievements</StyledHeading>
      <AchievementsList
        checkedGoals={checkedGoals}
        handleToggleChecked={handleToggleChecked}
      />
    </>
  );
}
