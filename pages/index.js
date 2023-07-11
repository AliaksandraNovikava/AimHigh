import ProposedGoalsList from "@/components/ProposedGoalsList";
import NewGoalsList from "@/components/NewGoalsList";
import NewGoalForm from "@/components/NewGoalForm";
import Button from "@/components/Button";
import { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import { uid } from "uid";
import styled from "styled-components";

const StyledHeading = styled.h2`
  font-size: 21px;
  font-weight: 500;
  line-height: 1.5;
`;

export default function HomePage({ goals, categoryColors }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [newGoal, setNewGoal] = useLocalStorageState("newGoal", {
    defaultValue: {
      myGoal: "",
      repetition: false,
      targetPerInterval: 1,
      interval: "day",
      deadlineVisible: false,
      deadline: "",
      myNewGoals: [],
    },
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setSelectedGoal(null);
  };

  const handleOpenModalFromListItem = (goal) => {
    setIsModalOpen(true);
    setSelectedGoal(goal);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setNewGoal((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else {
      setNewGoal((prevState) => ({
        ...prevState,
        [name]: value,
        myGoal: value,
      }));
    }
  };

  const handleTargetPerIntervalChange = (value) => {
    setNewGoal((prevState) => ({
      ...prevState,
      targetPerInterval: value,
    }));
  };

  const handleAddGoal = (event) => {
    event.preventDefault();
    const myNewGoal = {
      id: uid(),
      icon: selectedGoal ? selectedGoal.icon : "/icons/icons8-bullseye-48.png",
      name: selectedGoal ? selectedGoal.description : newGoal.myGoal,
      targetPerInterval: selectedGoal
        ? newGoal.targetPerInterval
        : newGoal.repetition
        ? newGoal.targetPerInterval
        : null,
      interval: selectedGoal
        ? newGoal.interval
        : newGoal.repetition
        ? newGoal.interval
        : null,
      deadline: newGoal.deadlineVisible ? newGoal.deadline : null,
      creationDate: new Date().toLocaleDateString(),
    };
    setNewGoal((prevGoals) => ({
      myNewGoals: [...prevGoals.myNewGoals, myNewGoal],
      myGoal: "",
      repetition: false,
      targetPerInterval: 1,
      interval: "day",
      deadlineVisible: false,
      deadline: "",
    }));
    setIsModalOpen(false);
    event.target.reset();
  };

  useEffect(() => {
    const handleEscapeKeyPress = (e) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscapeKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress);
    };
  }, [isModalOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
    setNewGoal(() => ({
      myGoal: "",
      repetition: false,
      targetPerInterval: 1,
      interval: "day",
      deadlineVisible: false,
      deadline: "",
    }));
  };

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
