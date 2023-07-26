import { StyledGoalText } from "@/components/NewGoalForm";
import Modal from "../Modal";
import DayPickerCalendar from "../DayPickerCalendar";
import styled from "styled-components";
import Image from "next/image";
import Button from "@/components/Button";

const StyledCloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 15px;
`;

const StyledDeadlineBox = styled.div`
  font-size: 11px;
  padding: 10px 23px;
  border: solid 1px #000;
  border-radius: 10px;
  text-align: center;
  font-size: 1em;
`;

const StyledButtonsBox = styled.div`
  display: flex;
  gap: 30px;
`;

const StyledInput = styled.input`
  width: 50px;
`;

export default function NewGoalDetails({
  isModalOpen,
  closeModal,
  selectedGoal,
  onDeleteGoal,
  onEditGoal,
  onSaveEdit,
  onCancelEdit,
  onEdit,
  isEditing,
}) {
  // PLEASE NOTE:
  // I (wanted but) couldn't use useLocalStorageState with the DayPicker state variable "days".
  // The component wouldn't work if I implemeted this hook.
  // That's why until I've found a solution for this problem, all clicked days are saved in the markedDays variable.
  // There're some other problems related to the DayPicker component that are visible in the frontend. Please ignore them for now.

  let goalContent;
  let goalDeadline;
  let editButtons;

  if (selectedGoal && isEditing) {
    goalContent = (
      <>
        <div>
          <StyledInput
            type="number"
            name="targetPerInterval"
            value={selectedGoal.targetPerInterval}
            onChange={onEditGoal}
          />
          <span> time(s) a </span>
          <select
            name="interval"
            value={selectedGoal.interval}
            onChange={onEditGoal}
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </div>
        <DayPickerCalendar isModalOpen={isModalOpen} />
      </>
    );
    goalDeadline = (
      <StyledDeadlineBox>
        Deadline:
        <input
          name="deadline"
          type="date"
          value={selectedGoal.deadline}
          onChange={onEditGoal}
        />
      </StyledDeadlineBox>
    );
    editButtons = (
      <StyledButtonsBox>
        <Button onClick={onSaveEdit}>Save</Button>
        <Button onClick={onCancelEdit}>Cancel</Button>
      </StyledButtonsBox>
    );
  } else if (selectedGoal) {
    goalContent = (
      <>
        {selectedGoal.targetPerInterval} time(s) a {selectedGoal.interval}
        <DayPickerCalendar isModalOpen={isModalOpen} />
      </>
    );
    goalDeadline = (
      <StyledDeadlineBox>Deadline: {selectedGoal.deadline}</StyledDeadlineBox>
    );
    editButtons = (
      <StyledButtonsBox>
        {(selectedGoal.interval || selectedGoal.deadline) && (
          <Button onClick={onEdit}>Edit</Button>
        )}
        <Button onClick={() => onDeleteGoal(selectedGoal.id)}>Delete</Button>
      </StyledButtonsBox>
    );
  } else {
    goalContent = null;
    goalDeadline = null;
  }

  return (
    <>
      {isModalOpen && (
        <Modal position="absolute" top="5%" closeModal={closeModal}>
          {selectedGoal && (
            <>
              <StyledCloseButton onClick={closeModal}>⨉</StyledCloseButton>
              <Image
                src={selectedGoal.icon}
                alt={selectedGoal.name}
                width={40}
                height={40}
              />
              <StyledGoalText>{selectedGoal.name}</StyledGoalText>
              {selectedGoal.interval && <>{goalContent}</>}
              {selectedGoal.deadline && <>{goalDeadline}</>}
              {editButtons}
            </>
          )}
        </Modal>
      )}
    </>
  );
}
