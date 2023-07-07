import { useState } from "react";

export default function NewGoalForm({ goals }) {
  const { description, icon, category } = goals;

  const [myGoal, setMyGoal] = useState("");
  const [repetition, setRepetition] = useState(false);
  const [targetPerInterval, setTargetPerInterval] = useState(1);
  const [interval, setInterval] = useState("day");
  const [deadlineVisible, setDeadlineVisible] = useState(false);
  const [deadline, setDeadline] = useState("");
  const [myGoals, setMyGoals] = useState([]);

  const handleGoalChange = (event) => {
    setMyGoal(event.target.value);
  };

  const handleRepetitionChange = () => {
    setRepetition(!repetition);
  };

  const handleTargetPerIntervalChange = (value) => {
    setTargetPerInterval(value);
  };

  const handleIntervalChange = (event) => {
    setInterval(event.target.value);
  };

  const handleDeadlineVisibleChange = () => {
    setDeadlineVisible(!deadlineVisible);
  };

  const handleDeadlineChange = (event) => {
    setDeadline(event.target.value);
  };

  return (
    <>
      <form onSubmit>
        <div>
          <label htmlFor="goalInput">I want to</label>
          <input
            type="text"
            id="goalInput"
            value={myGoal}
            onChange={handleGoalChange}
          />
        </div>
        <div>
          <label htmlFor="repetitionCheckbox">set repetition:</label>
          <input
            type="checkbox"
            id="repetitionCheckbox"
            checked={repetition}
            onChange={handleRepetitionChange}
          />
        </div>
        {repetition && (
          <div>
            <button
              type="button"
              onClick={() =>
                handleTargetPerIntervalChange(targetPerInterval - 1)
              }
            >
              -
            </button>
            <span>{targetPerInterval}</span>
            <button
              type="button"
              onClick={() =>
                handleTargetPerIntervalChange(targetPerInterval + 1)
              }
            >
              +
            </button>
          </div>
        )}
        <div>
          <label htmlFor="intervalSelect">set interval</label>
          <select
            id="intervalSelect"
            value={interval}
            onChange={handleIntervalChange}
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </div>
        <div>
          <label htmlFor="setDeadlineCheckbox">set deadline</label>
          <input
            type="checkbox"
            id="setDeadlineCheckbox"
            checked={deadlineVisible}
            onChange={handleDeadlineVisibleChange}
          />
        </div>
        {deadlineVisible && (
          <div>
            <input
              type="date"
              id="deadlineInput"
              value={deadline}
              onChange={handleDeadlineChange}
            />
          </div>
        )}
        <button type="submit">Add your goal</button>
      </form>
    </>
  );
}
