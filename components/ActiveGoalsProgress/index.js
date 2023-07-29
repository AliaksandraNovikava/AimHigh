import { StyledList, StyledCard } from "../NewGoalsList";
import ProgressPreview from "../ProgressPreview";
import { useEffect, useState } from "react";

export default function ActiveGoalsProgress({ uncheckedGoals }) {
  const [markedDaysCount, setMarkedDaysCount] = useState({});
  const [selectedGoalId, setSelectedGoalId] = useState(null);

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

  function checkIntervalTarget(interval, targetPerInterval, days) {
    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getTime() - intervalToMilliseconds(interval)
    );
    const datesWithinInterval = Array.isArray(days)
      ? days.filter(
          (day) => new Date(day) >= startDate && new Date(day) <= currentDate
        )
      : [];

    return datesWithinInterval.length >= targetPerInterval;
  }

  function intervalToMilliseconds(interval) {
    switch (interval) {
      case "day":
        return 24 * 60 * 60 * 1000;
      case "week":
        return 7 * 24 * 60 * 60 * 1000;
      case "month":
        return 30 * 24 * 60 * 60 * 1000;
      default:
        return 24 * 60 * 60 * 1000;
    }
  }

  function handleToggleMessage(goalId) {
    setSelectedGoalId((prevSelectedGoalId) =>
      prevSelectedGoalId === goalId ? null : goalId
    );
  }

  return (
    <>
      <StyledList>
        {uncheckedGoals.map((goal) => {
          const isIntervalMet = checkIntervalTarget(
            goal.interval,
            goal.targetPerInterval,
            goal.days
          );
          if (goal.hasOwnProperty("interval") && goal.interval !== null) {
            return (
              <StyledCard
                key={goal.id}
                backgroundcolor="#fff"
                boxshadow={
                  isIntervalMet
                    ? "0 2px 6px rgba(51, 201, 39, 0.23)"
                    : "0 2px 6px rgba(255, 94, 94, 0.23)"
                }
                onClick={() => handleToggleMessage(goal.id)}
              >
                <ProgressPreview
                  image={goal.icon}
                  title={goal.name}
                  markedDaysCount={markedDaysCount}
                  uncheckedGoalId={goal.id}
                  goal={goal}
                  isDeadlineTab={false}
                  isIntervalMet={isIntervalMet}
                  showMessage={goal.id === selectedGoalId}
                  selectedGoalId={selectedGoalId}
                />
              </StyledCard>
            );
          }
          return null;
        })}
      </StyledList>
    </>
  );
}
