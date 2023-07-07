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
            onChange
          />
        </div>
        {repetition && (
          <div>
            <button type="button" onClick>
              -
            </button>
            <span>{targetPerInterval}</span>
            <button type="button" onClick>
              +
            </button>
          </div>
        )}
        <div>
          <label htmlFor="intervalSelect">set interval</label>
          <select id="intervalSelect" value={interval} onChange>
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
            onChange
          />
        </div>
        {deadlineVisible && (
          <div>
            <input type="date" id="deadlineInput" value={deadline} onChange />
          </div>
        )}
        <button type="submit">Add your goal</button>
      </form>
    </>
  );
}
