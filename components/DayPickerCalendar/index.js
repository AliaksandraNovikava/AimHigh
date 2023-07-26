import { useState, useEffect, createContext } from "react";
import useLocalStorageState from "use-local-storage-state";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { parseISO, isSameDay } from "date-fns";
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

  return (
    <MarkedDaysContext.Provider value={{ markedDays, setMarkedDays }}>
      {children}
    </MarkedDaysContext.Provider>
  );
};

export default function DayPickerCalendar({ isModalOpen }) {
  const initialDays = [];
  const [days, setDays] = useState(initialDays);
  const [markedDays, setMarkedDays] = useLocalStorageState("markedDays", []);

  useEffect(() => {
    if (isModalOpen) {
      const dates = JSON.parse(localStorage.getItem("days"));
      if (dates?.length > 0) {
        const transformedDays = dates.map((date) => parseISO(date));
        setDays(transformedDays);
      }
    } else {
      const datesStrings = days.map((day) => day.toISOString());
      localStorage.setItem("days", JSON.stringify(datesStrings));
    }

    return () => {
      const datesStrings = days.map((day) => day.toISOString());
      localStorage.setItem("days", JSON.stringify(datesStrings));
    };
  }, [isModalOpen]);
  console.log("DayPicker:", days);
  //   function handleDayClick(day) {
  //     const clickedDay = day;
  //     if (!markedDays) {
  //       setMarkedDays([]);
  //     }
  //     const isAlreadyMarked = markedDays.some((markedDay) =>
  //       isSameDay(markedDay.date, clickedDay)
  //     );
  //     if (!isAlreadyMarked) {
  //       const newMarkedDay = {
  //         goalId: selectedGoal.id,
  //         date: clickedDay,
  //       };
  //       setMarkedDays((prevMarkedDays) => {
  //         if (!prevMarkedDays) {
  //           return [newMarkedDay];
  //         }
  //         return [...prevMarkedDays, newMarkedDay];
  //       });
  //     }
  //   }

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
        // onDayClick={handleDayClick}
      />
    </StyledCalendar>
  );
}
