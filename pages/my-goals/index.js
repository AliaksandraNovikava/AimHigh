import NewGoalsList from "@/components/NewGoalsList";
import NewGoalDetails from "@/components/NewGoalDetails";
import { StyledHeading } from "..";

export default function MyGoalsPage({
  newGoal,
  handleToggleChecked,
  checkedGoals,
  isModalOpen,
  closeModal,
  handleOpenModalFromListItem,
  handleDeleteGoal,
  handleEditChange,
  handleSaveEdit,
  selectedGoal,
  isEditing,
  handleCancel,
  handleEdit,
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
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        selectedGoal={selectedGoal}
        onDeleteGoal={handleDeleteGoal}
        onEditGoal={handleEditChange}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={handleCancel}
        onEdit={handleEdit}
        isEditing={isEditing}
      />
    </>
  );
}
