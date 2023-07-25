import { StyledList, StyledCard } from "../NewGoalsList";
import ProgressPreview from "../ProgressPreview";
import { useContext } from "react";
import { MarkedDaysContext } from "../NewGoalDetails";
import { useEffect, useState } from "react";

export default function ActiveGoalsProgress({ newGoalsEntries }) {
  const uncheckedGoals = newGoalsEntries.filter((goal) => !goal.isChecked);
  const { markedDays, setMarkedDays } = useContext(MarkedDaysContext);
  const [markedDaysCount, setMarkedDaysCount] = useState({});

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
            />
          </StyledCard>
        ))}
      </StyledList>
    </>
  );
}
