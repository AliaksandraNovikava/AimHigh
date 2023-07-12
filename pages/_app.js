import GlobalStyle from "../styles";
import { goals, categoryColors } from "../lib/data.js";
import { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import { uid } from "uid";

export default function App({ Component, pageProps }) {
  const [isModalOpen, setIsModalOpen] = useLocalStorageState(
    "isModalOpen",
    false
  );
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
  });

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        goals={goals}
        categoryColors={categoryColors}
        newGoal={newGoal}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        handleOpenModal={handleOpenModal}
        handleOpenModalFromListItem={handleOpenModalFromListItem}
        handleInputChange={handleInputChange}
        handleTargetPerIntervalChange={handleTargetPerIntervalChange}
        handleAddGoal={handleAddGoal}
        selectedGoal={selectedGoal}
      />
    </>
  );
}
