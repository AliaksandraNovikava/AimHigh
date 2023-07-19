import {
  StyledModalBody,
  StyledModal,
  StyledOverlay,
  StyledGoalText,
} from "@/components/NewGoalForm";
import styled from "styled-components";
import { useState } from "react";
import Image from "next/image";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Button from "@/components/Button";

const StyledCalendar = styled.section`
  margin-top: 15px;
  padding: 10px 13px 0;
  border-radius: 15px;
  background-color: #f6f5f8;
  box-shadow: 0 2px 6px rgb(109 94 255 / 10%);
`;

const StyledDescription = styled.p`
  font-size: 0.8em;
  font-style: italic;
  color: #8e8e93;
  margin: 20px 10px;
`;

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
  const initialDays = [];
  const [days, setDays] = useState(initialDays);

  const footer =
    days && days.length > 0 ? (
      <StyledDescription>
        You selected <strong>{days.length}</strong> day(s).
      </StyledDescription>
    ) : (
      <StyledDescription>Please pick one or more days.</StyledDescription>
    );

  let goalContent;
  let goalDeadline;
  let editButtons;

  if (selectedGoal && isEditing) {
    goalContent = (
      <>
        <div>
          <input
            type="number"
            name="targetPerInterval"
            value={selectedGoal.targetPerInterval}
            onChange={onEditGoal}
          />
          <span>time(s) a</span>
          <select
            name="interval"
            value={selectedGoal.interval}
            onChange={onEditGoal}
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
          <StyledCalendar>
            <StyledDescription>
              Mark the days when you did something to achieve your goal.
            </StyledDescription>
            <DayPicker
              mode="multiple"
              min={1}
              selected={days}
              onSelect={setDays}
              footer={footer}
            />
          </StyledCalendar>
        </div>
      </>
    );
    goalDeadline = (
      <input
        name="deadline"
        type="date"
        value={selectedGoal.deadline}
        onChange={onEditGoal}
      />
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
        <StyledCalendar>
          <StyledDescription>
            Mark the days when you did something to achieve your goal.
          </StyledDescription>
          <DayPicker
            mode="multiple"
            min={1}
            selected={days}
            onSelect={setDays}
            footer={footer}
          />
        </StyledCalendar>
      </>
    );
    goalDeadline = (
      <StyledDeadlineBox>Deadline: {selectedGoal.deadline}</StyledDeadlineBox>
    );
    editButtons = (
      <StyledButtonsBox>
        <Button onClick={onEdit}>Edit</Button>
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
        <StyledModalBody>
          <StyledModal position="absolute" top="5%" hidden>
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
          </StyledModal>
          <StyledOverlay onClick={closeModal} />
        </StyledModalBody>
      )}
    </>
  );
}
