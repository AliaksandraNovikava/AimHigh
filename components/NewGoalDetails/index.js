import {
  StyledModalBody,
  StyledModal,
  StyledOverlay,
} from "@/components/NewGoalForm";
import { useState } from "react";
import Image from "next/image";
import { DayPicker } from "react-day-picker";

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
      <p>You selected {days.length} day(s).</p>
    ) : (
      <p>Please pick one or more days.</p>
    );
  return (
    <>
      {isModalOpen && (
        <StyledModalBody>
          <StyledModal hidden>
            <Image
              src={selectedGoal.icon}
              alt={selectedGoal.name}
              width={40}
              height={40}
            />
            {selectedGoal && (
              <>
                <p>{selectedGoal.name}</p>
                <p>
                  `${selectedGoal.targetPerInterval} times a $
                  {selectedGoal.interval}`
                </p>
                <DayPicker
                  mode="multiple"
                  min={1}
                  selected={days}
                  onSelect={setDays}
                  footer={footer}
                />
              </>
            )}
          </StyledModal>
          <StyledOverlay onClick={closeModal} />
        </StyledModalBody>
      )}
    </>
  );
}
