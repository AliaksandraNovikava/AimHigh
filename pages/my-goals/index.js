import NewGoalsList from "@/components/NewGoalsList";
import NewGoalDetails from "@/components/NewGoalDetails";
import { StyledHeading } from "..";

export default function MyGoalsOPage({
  newGoal,
  handleToggleChecked,
  checkedGoals,
  isModalOpen,
  closeModal,
  handleOpenModalFromListItem,
  selectedGoal,
}) {
  return (
    <>
      <StyledHeading>My Goals</StyledHeading>
      <NewGoalsList
        newGoalsEntries={newGoal.myNewGoals}
        handleToggleChecked={handleToggleChecked}
        checkedGoals={checkedGoals}
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
