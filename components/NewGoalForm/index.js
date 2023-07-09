import { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";

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

export default function NewGoalForm({ goals }) {
  const { description, icon, category, name } = goals;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [newGoal, setNewGoal] = useState({
    myGoal: "",
    repetition: false,
    targetPerInterval: 1,
    interval: false,
    deadlineVisible: false,
    deadline: "",
    myNewGoals: [],
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setSelectedGoal(null);
    // setNewGoal("");
  };

  const handleOpenModalFromListItem = (goal) => {
    setIsModalOpen(true);
    setSelectedGoal(goal);
    // setNewGoal("");
  };

  //   const handleChange = (event) => {
  //     setNewGoal({
  //       ...newGoal,
  //       [event.target.name]: event.target.value,
  //       [event.target.interval]: event.target.value,
  //       [event.target.deadline]: event.target.value,
  //     });
  //   };

  const handleChange = (event) => {
    setNewGoal((prevState) => ({
      ...prevState,
      myGoal: event.target.value,
    }));
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
      <button onClick={handleOpenModal}>Open Modal</button>
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
                    src={goals.icon}
                    alt={goals.name}
                    width={40}
                    height={40}
                  />
                  <div>
                    <label htmlFor="newGoalInput">I want to</label>
                    <input
                      type="text"
                      id="newGoalInput"
                      value={newGoal}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
              {/* <label htmlFor="goalInput">I want to</label>
                <br></br>
                <input
                  name="myGoal"
                  type="text"
                  id="goalInput"
                  value={newGoal.myGoal}
                  onChange={handleChange}
                />
              </div> */}
              <div>
                <label htmlFor="repetitionCheckbox">set repetition:</label>
                <input
                  name="repetition"
                  type="checkbox"
                  id="repetitionCheckbox"
                  checked={newGoal.repetition}
                  onChange={handleChange}
                />
              </div>
              {newGoal.repetition && (
                <>
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        handleTargetPerIntervalChange(
                          newGoal.targetPerInterval < 2
                            ? 1
                            : newGoal.targetPerInterval - 1
                        )
                      }
                    >
                      -
                    </button>
                    <span>{newGoal.targetPerInterval}</span>
                    <button
                      type="button"
                      onClick={() =>
                        handleTargetPerIntervalChange(
                          newGoal.targetPerInterval + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <div>
                    <label htmlFor="intervalSelect">set interval</label>
                    <select
                      name="interval"
                      id="intervalSelect"
                      value={newGoal.interval}
                      onChange={handleChange}
                    >
                      <option value="day">Day</option>
                      <option value="week">Week</option>
                      <option value="month">Month</option>
                    </select>
                  </div>
                </>
              )}
              <div>
                <label htmlFor="setDeadlineCheckbox">set deadline</label>
                <input
                  name="deadlineVisible"
                  type="checkbox"
                  id="setDeadlineCheckbox"
                  checked={newGoal.deadlineVisible}
                  onChange={handleChange}
                />
              </div>
              {newGoal.deadlineVisible && (
                <div>
                  <input
                    name="deadline"
                    type="date"
                    id="deadlineInput"
                    value={newGoal.deadline}
                    onChange={handleChange}
                  />
                </div>
              )}
              <button type="submit" disabled={!newGoal.myGoal}>
                Add your goal
              </button>
            </form>
          </StyledModal>
          <StyledOverlay onClick={closeModal} />
        </StyledModalBody>
      )}
    </>
  );
}
