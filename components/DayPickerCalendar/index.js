import { useState, useEffect, createContext } from "react";
import useLocalStorageState from "use-local-storage-state";
import { DayPicker } from "react-day-picker";
import { isSameDay, parseISO } from "date-fns";
import "react-day-picker/dist/style.css";
import styled from "styled-components";

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

export const MarkedDaysContext = createContext();
export const MarkedDaysProvider = ({ children }) => {
  const [markedDays, setMarkedDays] = useLocalStorageState("markedDays", {
    defaultValue: [],
  });
  const initialDays = [];
  const [days, setDays] = useState(initialDays);

  return (
    <MarkedDaysContext.Provider
      value={{ markedDays, setMarkedDays, days, setDays }}
    >
      {children}
    </MarkedDaysContext.Provider>
  );
};

export default function DayPickerCalendar({ isModalOpen, selectedGoal }) {
  const initialDays = [];
  const [days, setDays] = useState(initialDays);
  const [markedDays, setMarkedDays] = useLocalStorageState("markedDays", {
    defaultValue: [],
  });

  useEffect(() => {
    if (isModalOpen) {
      const dates = JSON.parse(localStorage.getItem("days"));
      if (dates?.length > 0) {
        const transformedDays = dates.map((date) => parseISO(date));
        setDays(transformedDays);
      }
    }
  }, [isModalOpen]);

  useEffect(() => {
    const datesStrings = days.map((day) => day.toISOString());
    localStorage.setItem("days", JSON.stringify(datesStrings));
    const markedDaysObjects = days.map((day) => ({
      goalId: selectedGoal.id.toString(),
      date: day,
    }));
    setMarkedDays(markedDaysObjects);
  }, [days, selectedGoal]);

  console.log("markedDays:", markedDays);
  console.log("days:", days);
  const footer =
    days && days.length > 0 ? (
      <StyledDescription>
        You selected <strong>{days.length}</strong> day(s).
      </StyledDescription>
    ) : (
      <StyledDescription>Please pick one or more days.</StyledDescription>
    );

  return (
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
  );
}
