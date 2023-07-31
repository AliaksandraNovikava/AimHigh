import styled from "styled-components";
import Image from "next/image";
import Button from "../Button";
import Modal from "../Modal";
import { StyledCloseButton } from "../NewGoalDetails/NewGoalDetails";

export const StyledGoalText = styled.p`
  font-size: 1.2em;
  font-weight: bold;
  margin: 0.5em;
`;

const StyledForm = styled.form`
  display: flex;
  gap: 0.6em;
  flex-direction: column;
  align-items: center;
`;

const CounterBox = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

const Counter = styled.button`
  border-radius: 30%;
  font-size: 1.3rem;
  width: 30px;
  height: 30px;
  border: none;
  background-color: #f6f5f8;
`;

const sharedStyles = `
outline: 0;
background: #f6f5f8;
border: 0;
padding: 5px;
box-sizing: border-box;
font-size: 14px;
`;

export const Select = styled.select`
  ${sharedStyles}
`;

export const Input = styled.input`
  ${sharedStyles}
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
          <>
            <StyledCloseButton onClick={closeModal}>⨉</StyledCloseButton>
            <StyledForm onSubmit={handleAddGoal}>
              {selectedGoal ? (
                <>
                  <Image
                    src={selectedGoal.icon}
                    alt={selectedGoal.name}
                    width={40}
                    height={40}
                  />
                  <StyledGoalText>{selectedGoal.description}</StyledGoalText>
                  <CounterBox>
                    <Counter
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
                    </Counter>
                    <span>{newGoal.targetPerInterval}</span>
                    <Counter
                      type="button"
                      onClick={() =>
                        handleTargetPerIntervalChange(
                          newGoal.targetPerInterval + 1
                        )
                      }
                    >
                      +
                    </Counter>
                  </CounterBox>

                  <div>
                    <label htmlFor="intervalSelect">times a </label>
                    <Select
                      name="interval"
                      id="intervalSelect"
                      value={newGoal.interval}
                      onChange={handleInputChange}
                    >
                      <option value="day">Day</option>
                      <option value="week">Week</option>
                      <option value="month">Month</option>
                    </Select>
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
                    <Input
                      type="text"
                      id="newGoalInput"
                      value={newGoal.myGoal}
                      onChange={(event) => handleUserInput(event)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="repetitionCheckbox">set repetition:</label>
                    <Input
                      name="repetition"
                      type="checkbox"
                      id="repetitionCheckbox"
                      checked={newGoal.repetition}
                      onChange={handleInputChange}
                    />
                  </div>
                  {newGoal.repetition && (
                    <>
                      <CounterBox>
                        <Counter
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
                        </Counter>
                        <span>{newGoal.targetPerInterval}</span>
                        <Counter
                          type="button"
                          onClick={() =>
                            handleTargetPerIntervalChange(
                              newGoal.targetPerInterval + 1
                            )
                          }
                        >
                          +
                        </Counter>
                      </CounterBox>

                      <div>
                        <label htmlFor="intervalSelect">times a </label>
                        <Select
                          name="interval"
                          id="intervalSelect"
                          value={newGoal.interval}
                          onChange={handleInputChange}
                        >
                          <option value="day">Day</option>
                          <option value="week">Week</option>
                          <option value="month">Month</option>
                        </Select>
                      </div>
                    </>
                  )}
                </>
              )}

              <div>
                <label htmlFor="setDeadlineCheckbox">set deadline</label>
                <Input
                  name="deadlineVisible"
                  type="checkbox"
                  id="setDeadlineCheckbox"
                  checked={newGoal.deadlineVisible}
                  onChange={handleInputChange}
                />
              </div>
              {newGoal.deadlineVisible && (
                <div>
                  <Input
                    name="deadline"
                    type="date"
                    id="deadlineInput"
                    value={newGoal.deadline}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              <Button type="submit">Add your goal</Button>
            </StyledForm>
          </>
        </Modal>
      )}
    </>
  );
}
