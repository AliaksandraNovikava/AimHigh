import { StyledList, StyledCard } from "../NewGoalsList";
import ProgressPreview from "../ProgressPreview";
import { useContext } from "react";
import { MarkedDaysContext } from "../DayPickerCalendar";
import { useEffect, useState } from "react";

export default function ActiveGoalsProgress({ uncheckedGoals }) {
  //   const uncheckedGoals = newGoalsEntries.filter((goal) => !goal.isChecked);
  const { markedDays, setMarkedDays } = useContext(MarkedDaysContext);
  const [markedDaysCount, setMarkedDaysCount] = useState({});
  console.log(uncheckedGoals);
  useEffect(() => {
    const countMarkedDays = () => {
      const count = {};
      markedDays?.forEach((markedDay) => {
        const { goalId } = markedDay;
        count[goalId] = (count[goalId] || 0) + 1;
      });
      setMarkedDaysCount(count);
    };

    countMarkedDays();
  }, [markedDays]);
  console.log("markedDaysCount", markedDaysCount);
  console.log("markedDays", markedDays);
  return (
    <>
      <StyledList>
        {uncheckedGoals.map((goal) =>
          goal.interval ? (
            <StyledCard key={goal.id} backgroundcolor="#fff">
              <ProgressPreview
                image={goal.icon}
                title={goal.name}
                markedDaysCount={markedDaysCount}
                uncheckedGoalId={goal.id}
                goal={goal}
              />
            </StyledCard>
          ) : null
        )}
      </StyledList>
    </>
  );
}
