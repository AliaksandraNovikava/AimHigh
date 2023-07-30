import NewGoalsList from "@/components/NewGoalsList";
import NewGoalDetails from "@/components/NewGoalDetails/NewGoalDetails";
import { StyledHeading } from "..";
import Head from "next/head";

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
  updateGoalWithDays,
}) {
  return (
    <>
      <Head>
        <title>AimHigh: Your set goals overview</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Get an organized overview of your set goals with AimHigh. Track your progress, view deadlines, and stay focused on achieving your targets."
        />
      </Head>
      <StyledHeading>My Goals</StyledHeading>
      <NewGoalsList
        handleToggleChecked={handleToggleChecked}
        uncheckedGoals={uncheckedGoals}
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
