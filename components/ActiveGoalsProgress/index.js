import { StyledList, StyledCard } from "../NewGoalsList";
import ProgressPreview from "../ProgressPreview";
import { useContext } from "react";
import { MarkedDaysContext } from "../DayPickerCalendar";
import { useEffect, useState } from "react";

export default function ActiveGoalsProgress({ uncheckedGoals }) {
  const { markedDays, setMarkedDays } = useContext(MarkedDaysContext);
  const [markedDaysCount, setMarkedDaysCount] = useState({});
  //   useEffect(() => {
  //     const countMarkedDays = () => {
  //       const count = {};
  //       markedDays?.forEach((markedDay) => {
  //         const { goalId } = markedDay;
  //         count[goalId] = (count[goalId] || 0) + 1;
  //       });
  //       setMarkedDaysCount(count);
  //     };
  //     countMarkedDays();
  //   }, [markedDays]);

  useEffect(() => {
    const countMarkedDays = () => {
      const count = {};
      uncheckedGoals?.forEach((goal) => {
        const { id, days } = goal;
        if (days && Array.isArray(days)) {
          count[id] = days.length;
        } else {
          count[id] = 0;
        }
      });
      setMarkedDaysCount(count);
    };
    countMarkedDays();
  }, [uncheckedGoals]);

  return (
    <>
      <StyledList>
        {uncheckedGoals.map((goal) => (
          <StyledCard key={goal.id} backgroundcolor="#fff">
            <ProgressPreview
              image={goal.icon}
              title={goal.name}
              markedDaysCount={markedDaysCount}
              uncheckedGoalId={goal.id}
              goal={goal}
              isDeadlineTab={false}
            />
          </StyledCard>
        ))}
      </StyledList>
    </>
  );
}
