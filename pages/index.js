import ProposedGoalsList from "@/components/ProposedGoalsList";
import NewGoalForm from "@/components/NewGoalForm";
import { useState, useEffect } from "react";
import styled from "styled-components";

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
  const [newGoal, setNewGoal] = useState({
    myGoal: "",
    repetition: false,
    targetPerInterval: 1,
    interval: "day",
    deadlineVisible: false,
    deadline: "",
    myNewGoals: [],
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
      id: goals.length++,
      name: selectedGoal ? selectedGoal.description : newGoal.myGoal,
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
      interval: "day",
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
      <button onClick={handleOpenModal}>Set your own goal</button>

      <NewGoalForm
        newGoal={newGoal}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        handleInputChange={handleInputChange}
        handleTargetPerIntervalChange={handleTargetPerIntervalChange}
        handleAddGoal={handleAddGoal}
        selectedGoal={selectedGoal}
      />

      {/* {isModalOpen && (
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
                    <label htmlFor="newGoalInput">I want to</label>
                    <br></br>
                    <input
                      type="text"
                      id="newGoalInput"
                      value={newGoal.myGoal}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              )}
              <div>
                <label htmlFor="repetitionCheckbox">set repetition:</label>
                <input
                  name="repetition"
                  type="checkbox"
                  id="repetitionCheckbox"
                  checked={newGoal.repetition}
                  onChange={handleInputChange}
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
                    <label htmlFor="intervalSelect">times a </label>
                    <select
                      name="interval"
                      id="intervalSelect"
                      value={newGoal.interval}
                      onChange={handleInputChange}
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
                  onChange={handleInputChange}
                />
              </div>
              {newGoal.deadlineVisible && (
                <div>
                  <input
                    name="deadline"
                    type="date"
                    id="deadlineInput"
                    value={newGoal.deadline}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              <button type="submit">Add your goal</button>
            </form>
          </StyledModal>
          <StyledOverlay onClick={closeModal} />
        </StyledModalBody>
      )} */}
    </>
  );
}
