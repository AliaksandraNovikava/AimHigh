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

export default function NewGoalDetails({
  newGoalsEntries,
  isModalOpen,
  closeModal,
  selectedGoal,
  onDeleteGoal,
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
                {selectedGoal.interval && (
                  <>
                    {selectedGoal.targetPerInterval} time(s) a{" "}
                    {selectedGoal.interval}
                    <StyledCalendar>
                      <StyledDescription>
                        Mark the days when you did something to achieve your
                        goal.
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
                )}
                {selectedGoal.deadline && (
                  <StyledDeadlineBox>
                    Deadline: {selectedGoal.deadline}
                  </StyledDeadlineBox>
                )}
                <Button onClick={() => onDeleteGoal(selectedGoal.id)}>
                  Delete
                </Button>
              </>
            )}
          </StyledModal>
          <StyledOverlay onClick={closeModal} />
        </StyledModalBody>
      )}
    </>
  );
}
