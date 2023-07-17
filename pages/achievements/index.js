import { StyledHeading } from "..";
import AchievementsList from "@/components/AchievementsList";
import NewGoalDetails from "@/components/NewGoalDetails";

export default function MyGoalsOPage({
  newGoal,
  checkedGoals,
  handleToggleChecked,
  isModalOpen,
  closeModal,
  handleOpenModalFromListItem,
  selectedGoal,
}) {
  return (
    <>
      <StyledHeading>My Achievements</StyledHeading>
      <AchievementsList
        checkedGoals={checkedGoals}
        handleToggleChecked={handleToggleChecked}
        onOpenModal={handleOpenModalFromListItem}
      />
      <NewGoalDetails
        newGoalsEntries={newGoal.myNewGoals}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        selectedGoal={selectedGoal}
      />
    </>
  );
}
