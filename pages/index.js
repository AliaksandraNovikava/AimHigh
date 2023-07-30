import ProposedGoalsList from "@/components/ProposedGoalsList/ProposedGoalsList";
import NewGoalForm from "@/components/NewGoalForm";
import Button from "@/components/Button";
import styled from "styled-components";
import Head from "next/head";

export const StyledHeading = styled.h2`
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
  handleUserInput,
}) {
  return (
    <>
      <Head>
        <title>AimHigh: Achieve your goals and empower yourself</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="AimHigh is a goal-setting platform designed to help you set and achieve your goals. Develop yourself, track your progress, and stay motivated with AimHigh. Start reaching new heights today!"
        />
      </Head>
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
        handleUserInput={handleUserInput}
      />
    </>
  );
}
