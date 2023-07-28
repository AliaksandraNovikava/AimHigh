import GlobalStyle from "@/styles";
import { goals, categoryColors } from "@/lib/data.js";
import { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import { uid } from "uid";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Navigation from "@/components/Navigation";
import { MarkedDaysProvider } from "@/components/DayPickerCalendar";

// import { useContext } from "react";
// import { MarkedDaysContext } from "@/components/DayPickerCalendar";

export default function App({ Component, pageProps }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useLocalStorageState(
    "selected Goal",
    { defaultValue: null }
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
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState("");

  // const { days } = useContext(MarkedDaysContext);

  const initialValue = selectedGoal;
  const myGoalsArray = newGoal.myNewGoals;
  const checkedGoals = myGoalsArray.filter((goal) => goal.isChecked);
  const uncheckedGoals = myGoalsArray.filter((goal) => !goal.isChecked);

  function handleOpenModal() {
    setIsModalOpen(true);
    setSelectedGoal(null);
  }

  function handleOpenModalFromListItem(goal) {
    setIsModalOpen(true);
    setSelectedGoal(goal);
  }

  function handleInputChange(event) {
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
  }

  function handleUserInput(event) {
    setNewGoal({
      ...newGoal,
      myGoal: event.target.value,
    });
  }

  function handleTargetPerIntervalChange(value) {
    setNewGoal((prevState) => ({
      ...prevState,
      targetPerInterval: value,
    }));
  }

  function handleAddGoal(event) {
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
  }

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

  function closeModal() {
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
    setIsEditing(false);
  }

  function handleToggleChecked(id) {
    const updatedGoalsArray = myGoalsArray.map((goal) =>
      goal.id === id ? { ...goal, isChecked: !goal.isChecked } : goal
    );

    setNewGoal((prevGoal) => ({
      ...prevGoal,
      myNewGoals: updatedGoalsArray,
    }));
  }

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

  function handleEdit() {
    setEditedValue(initialValue);
    setIsEditing(true);
  }

  function handleEditChange(event) {
    const { name, value } = event.target;
    setSelectedGoal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSaveEdit() {
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
  }

  function handleCancel() {
    setEditedValue(initialValue);
    setSelectedGoal((prevState) => ({
      ...prevState,
      targetPerInterval: editedValue.targetPerInterval,
      interval: editedValue.interval,
      deadline: editedValue.deadline,
    }));
    setIsEditing(false);
  }

  function updateGoalWithDays(selectedGoalId, days) {
    setNewGoal((prevGoal) => {
      const updatedMyNewGoals = prevGoal.myNewGoals.map((goal) => {
        if (goal.id === selectedGoalId) {
          return { ...goal, days };
        }
        return goal;
      });
      return {
        ...prevGoal,
        myNewGoals: updatedMyNewGoals,
      };
    });
  }

  return (
    <>
      <GlobalStyle />
      <MarkedDaysProvider>
        <Component
          {...pageProps}
          goals={goals}
          categoryColors={categoryColors}
          newGoal={newGoal}
          checkedGoals={checkedGoals}
          uncheckedGoals={uncheckedGoals}
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
          updateGoalWithDays={updateGoalWithDays}
        />
      </MarkedDaysProvider>
      <Navigation />
    </>
  );
}
