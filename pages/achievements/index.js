import { StyledHeading } from "..";
import AchievementsList from "@/components/AchievementsList";
import NewGoalDetails from "@/components/NewGoalDetails";

export default function AchievementsPage({
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
  updateGoalWithDays,
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
        newGoal={newGoal}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        selectedGoal={selectedGoal}
        onDeleteGoal={handleDeleteGoal}
        onEditGoal={handleEditChange}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={handleCancel}
        onEdit={handleEdit}
        isEditing={isEditing}
        updateGoalWithDays={updateGoalWithDays}
      />
    </>
  );
}
