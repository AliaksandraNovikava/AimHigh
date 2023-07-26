import styled from "styled-components";
import Image from "next/image";
import Button from "../Button";
import Modal from "../Modal";

export const StyledGoalText = styled.p`
  font-size: 1.2em;
  font-weight: bold;
  margin: 0.5em;
`;

export default function NewGoalForm({
  newGoal,
  isModalOpen,
  closeModal,
  handleInputChange,
  handleTargetPerIntervalChange,
  handleAddGoal,
  selectedGoal,
  handleUserInput,
}) {
  return (
    <>
      {isModalOpen && (
        <Modal position="fixed" top="10%" closeModal={closeModal}>
          <form onSubmit={handleAddGoal}>
            {selectedGoal ? (
              <>
                <Image
                  src={selectedGoal.icon}
                  alt={selectedGoal.name}
                  width={40}
                  height={40}
                />
                <StyledGoalText>{selectedGoal.description}</StyledGoalText>
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
                    onChange={(event) => handleUserInput(event)}
                    required
                  />
                </div>
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
            <Button type="submit">Add your goal</Button>
          </form>
        </Modal>
      )}
    </>
  );
}
