import GlobalStyle from "@/styles";
import { goals, categoryColors } from "@/lib/data.js";
import { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import { uid } from "uid";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Navigation from "@/components/Navigation";

export default function App({ Component, pageProps }) {
  const [isModalOpen, setIsModalOpen] = useLocalStorageState(
    "isModalOpen",
    false
  );
  const [selectedGoal, setSelectedGoal] = useLocalStorageState(
    "selected Goal",
    null
  );
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
      }));
    }
  };

  function handleUserInput(event) {
    setNewGoal({
      ...newGoal,
      myGoal: event.target.value,
    });
  }

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
      name: selectedGoal
        ? selectedGoal.description
        : `I want to ${newGoal.myGoal}`,
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
    setNewGoal((prevGoal) => ({
      ...prevGoal,
      myGoal: "",
      repetition: false,
      targetPerInterval: 1,
      interval: "day",
      deadlineVisible: false,
      deadline: "",
    }));
  };

  function handleToggleChecked(id) {
    const updatedGoalsArray = myGoalsArray.map((goal) =>
      goal.id === id ? { ...goal, isChecked: !goal.isChecked } : goal
    );

    setNewGoal((prevGoal) => ({
      ...prevGoal,
      myNewGoals: updatedGoalsArray,
    }));
  }

  const myGoalsArray = newGoal.myNewGoals;
  const checkedGoals = myGoalsArray.filter((goal) => goal.isChecked);

  function handleDelete(id) {
    const remainedGoals = myGoalsArray.filter((goal) => goal.id !== id);
    setNewGoal((prevGoal) => ({
      ...prevGoal,
      myNewGoals: remainedGoals,
    }));
    setIsModalOpen(false);
  }

  function handleDeleteGoal(id) {
    confirmAlert({
      title: "Are you sure?",
      message: "Do you want to delete this goal?",
      buttons: [
        {
          label: "No",
          onClick: () => close(),
        },
        {
          label: "Yes",
          onClick: () => handleDelete(id),
        },
      ],
    });
  }

  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState("");
  const initialValue = selectedGoal;

  const handleEdit = () => {
    setEditedValue(initialValue);
    setIsEditing(true);
  };

  function handleEditChange(event) {
    const { name, value } = event.target;
    setSelectedGoal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleSaveEdit = () => {
    const updatedGoal = {
      ...selectedGoal,
      targetPerInterval: selectedGoal.targetPerInterval,
      interval: selectedGoal.interval,
      deadline: selectedGoal.deadline,
    };

    const updatedGoals = myGoalsArray.map((goal) =>
      goal.id === selectedGoal.id ? updatedGoal : goal
    );

    setNewGoal((prevGoal) => ({
      ...prevGoal,
      myNewGoals: updatedGoals,
    }));
    setEditedValue(updatedGoal);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedValue(initialValue);
    setSelectedGoal((prevState) => ({
      ...prevState,
      targetPerInterval: editedValue.targetPerInterval,
      interval: editedValue.interval,
      deadline: editedValue.deadline,
    }));
    setIsEditing(false);
  };

  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        goals={goals}
        categoryColors={categoryColors}
        newGoal={newGoal}
        checkedGoals={checkedGoals}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        handleOpenModal={handleOpenModal}
        handleOpenModalFromListItem={handleOpenModalFromListItem}
        handleInputChange={handleInputChange}
        handleTargetPerIntervalChange={handleTargetPerIntervalChange}
        handleAddGoal={handleAddGoal}
        selectedGoal={selectedGoal}
        handleToggleChecked={handleToggleChecked}
        handleUserInput={handleUserInput}
        handleDeleteGoal={handleDeleteGoal}
        handleEditChange={handleEditChange}
        handleSaveEdit={handleSaveEdit}
        isEditing={isEditing}
        handleCancel={handleCancel}
        handleEdit={handleEdit}
      />
      <Navigation />
    </>
  );
}
