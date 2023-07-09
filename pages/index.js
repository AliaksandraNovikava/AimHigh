import ProposedGoalsList from "@/components/ProposedGoalsList";
import NewGoalForm from "@/components/NewGoalForm";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";

const StyledHeading = styled.h2`
  font-size: 21px;
  font-weight: 500;
  line-height: 1.5;
`;

const StyledModalBody = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* position: relative; */
`;

const StyledModal = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.4rem;
  width: 85%;
  padding: 1.3rem;
  min-height: 250px;
  position: fixed;
  top: 20%;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 15px;
  z-index: 10;
`;

const StyledModalCloseBtnContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledModalCloseBtn = styled.button`
  transform: translate(10px, -20px);
  padding: 0.5rem 0.7rem;
  background: #eee;
  border-radius: 50%;
`;

const StyledOverlay = styled.section`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

export default function HomePage({ goals, categoryColors }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [newGoal, setNewGoal] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setSelectedGoal(null);
    setNewGoal("");
  };

  const handleOpenModalFromListItem = (goal) => {
    setIsModalOpen(true);
    setSelectedGoal(goal);
    setNewGoal("");
  };

  const handleInputChange = (event) => {
    setNewGoal(event.target.value);
  };

  const handleAddGoal = (event) => {
    event.preventDefault();
    const myNewGoal = {
      id: goals.length + newGoal.myNewGoals.length,
      name: newGoal.myGoal,
      targetPerInterval: newGoal.targetPerInterval,
      interval: newGoal.repetition ? newGoal.interval : null,
      deadline: newGoal.deadlineVisible ? newGoal.deadline : null,
      creationDate: new Date().toLocaleDateString(),
    };
    setNewGoal((prevGoals) => ({
      myNewGoals: [...prevGoals.myNewGoals, myNewGoal],
      myGoal: "",
      repetition: false,
      targetPerInterval: 1,
      interval: false,
      deadlineVisible: false,
      deadline: "",
    }));
    setIsModalOpen(false);
    event.target.reset();
    console.log(newGoal.myNewGoals);
    console.log(myNewGoal);
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <StyledHeading>Choose goal</StyledHeading>
      <ProposedGoalsList
        goals={goals}
        categoryColors={categoryColors}
        onOpenModal={handleOpenModalFromListItem}
      />
      {/* <NewGoalForm goals={goals} /> */}
      <button onClick={handleOpenModal}>Open Form</button>

      {isModalOpen && (
        <StyledModalBody>
          <StyledModal hidden>
            <StyledModalCloseBtnContainer>
              <StyledModalCloseBtn onClick={closeModal}>x</StyledModalCloseBtn>
            </StyledModalCloseBtnContainer>
            <form onSubmit={handleAddGoal}>
              {selectedGoal ? (
                <>
                  <Image
                    src={selectedGoal.icon}
                    alt={selectedGoal.name}
                    width={40}
                    height={40}
                  />
                  <p>{selectedGoal.description}</p>
                </>
              ) : (
                <>
                  <Image
                    src="/icons/icons8-bullseye-48.png"
                    alt="your new goal"
                    width={40}
                    height={40}
                  />
                  <div>
                    <label htmlFor="newGoalInput">Enter a new goal:</label>
                    <input
                      type="text"
                      id="newGoalInput"
                      value={newGoal}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              )}

              <button type="submit">Submit</button>
            </form>
          </StyledModal>
          <StyledOverlay onClick={closeModal} />
        </StyledModalBody>
      )}
    </>
  );
}
