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
  margin: 20px 0;
`;

export default function NewGoalDetails({
  newGoalsEntries,
  isModalOpen,
  closeModal,
  selectedGoal,
}) {
  console.log("details", newGoalsEntries);
  console.log("selected goal", selectedGoal);
  //   const { icon, name, targetPerInterval, interval, deadline } = selectedGoal;
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
          <StyledModal hidden>
            {selectedGoal && (
              <>
                <Image
                  src={selectedGoal.icon}
                  alt={selectedGoal.name}
                  width={40}
                  height={40}
                />
                <StyledGoalText>{selectedGoal.name}</StyledGoalText>
                {selectedGoal.interval && (
                  <>
                    {selectedGoal.targetPerInterval} times a{" "}
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
              </>
            )}
          </StyledModal>
          <StyledOverlay onClick={closeModal} />
        </StyledModalBody>
      )}
    </>
  );
}
