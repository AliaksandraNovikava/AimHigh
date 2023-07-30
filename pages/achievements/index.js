import { StyledHeading } from "..";
import AchievementsList from "@/components/AchievementsList";
import NewGoalDetails from "@/components/NewGoalDetails/NewGoalDetails";
import Head from "next/head";

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
      <Head>
        <title>AimHigh: Achievements Overview</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Explore your achievements and milestones. AimHigh helps you recognize your success and motivates you to reach even greater heights."
        />
      </Head>

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
