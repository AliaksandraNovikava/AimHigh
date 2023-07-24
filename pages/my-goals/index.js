import NewGoalsList from "@/components/NewGoalsList";
import NewGoalDetails from "@/components/NewGoalDetails";
import { StyledHeading } from "..";

export default function MyGoalsPage({
  newGoal,
  handleToggleChecked,
  checkedGoals,
  uncheckedGoals,
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
        handleToggleChecked={handleToggleChecked}
        uncheckedGoals={uncheckedGoals}
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
