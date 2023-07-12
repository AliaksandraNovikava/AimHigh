import ProposedGoalsList from "@/components/ProposedGoalsList";
import NewGoalsList from "@/components/NewGoalsList";
import NewGoalForm from "@/components/NewGoalForm";
import Button from "@/components/Button";
import styled from "styled-components";

const StyledHeading = styled.h2`
  font-size: 21px;
  font-weight: 500;
  line-height: 1.5;
`;

export default function ProposedGoalsListPage({
  goals,
  categoryColors,
  newGoal,
  selectedGoal,
  handleOpenModal,
  handleOpenModalFromListItem,
  isModalOpen,
  closeModal,
  handleInputChange,
  handleTargetPerIntervalChange,
  handleAddGoal,
}) {
  return (
    <>
      <StyledHeading>Choose goal</StyledHeading>
      <ProposedGoalsList
        goals={goals}
        categoryColors={categoryColors}
        onOpenModal={handleOpenModalFromListItem}
      />
      <Button onClick={handleOpenModal}>Set your own goal</Button>

      <NewGoalForm
        newGoal={newGoal}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        handleInputChange={handleInputChange}
        handleTargetPerIntervalChange={handleTargetPerIntervalChange}
        handleAddGoal={handleAddGoal}
        selectedGoal={selectedGoal}
      />
      <StyledHeading>My Goals</StyledHeading>
      <NewGoalsList newGoalsEntries={newGoal.myNewGoals} />
    </>
  );
}
