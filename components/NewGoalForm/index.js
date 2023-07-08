import { useState } from "react";

export default function NewGoalForm({ goals }) {
  const { description, icon, category } = goals;

  //   const [myGoal, setMyGoal] = useState("");
  //   const [repetition, setRepetition] = useState(false);
  //   const [targetPerInterval, setTargetPerInterval] = useState(1);
  //   const [interval, setInterval] = useState("day");
  //   const [deadlineVisible, setDeadlineVisible] = useState(false);
  //   const [deadline, setDeadline] = useState("");
  //   const [myNewGoals, setMyNewGoals] = useState([]);

  //   function enable(el) {
  //     el.disabled = false;
  //   }

  //   function disable(el) {
  //     el.disabled = true;
  //   }

  //   const handleGoalChange = (event) => {
  //     setMyGoal(event.target.value);
  //     if (event.target.value.length === 0) {
  //       disable(addButton);
  //     } else {
  //       enable(addButton);
  //     }
  //   };

  //   const handleRepetitionChange = () => {
  //     setRepetition(!repetition);
  //   };

  //   const handleTargetPerIntervalChange = (value) => {
  //     setTargetPerInterval(value);
  //   };

  //   const handleIntervalChange = (event) => {
  //     setInterval(event.target.value);
  //   };

  //   const handleDeadlineVisibleChange = () => {
  //     setDeadlineVisible(!deadlineVisible);
  //   };

  //   const handleDeadlineChange = (event) => {
  //     setDeadline(event.target.value);
  //   };

  //---------------------------------------------------//

  const [newGoal, setNewGoal] = useState({
    myGoal: "",
    repetition: false,
    targetPerInterval: 1,
    interval: false,
    deadlineVisible: false,
    deadline: "",
    myNewGoals: [],
  });

  const handleChange = (event) => {
    setNewGoal({
      ...newGoal,
      [event.target.name]: event.target.value,
      [event.target.interval]: event.target.value,
      [event.target.deadline]: event.target.value,
    });
  };

  const handleAddGoal = (event) => {
    event.preventDefault();
    const myNewGoal = {
      id: goals.length + newGoal.myNewGoals.length,
      name: newGoal.myGoal,
      targetPerInterval: newGoal.targetPerInterval,
      interval: newGoal.interval,
      deadline: newGoal.deadlineVisible ? newGoal.deadline : null,
      creationDate: new Date().toLocaleDateString(),
    };
    setNewGoal((prevGoals) => ({
      myNewGoals: [...prevGoals.myNewGoals, myNewGoal],
      myGoal: "",
      repetition: false,
      targetPerInterval: 1,
      interval: false,
      deadlineVisible: false,
      deadline: "",
    }));

    event.target.reset();
    console.log(newGoal.myNewGoals);
    console.log(myNewGoal);
    // setMyNewGoals([...myNewGoals, newGoal]);
    // setMyGoal("");
    // setRepetition(false);
    // setTargetPerInterval(1);
    // setDeadlineVisible(false);
    // setDeadline("");
    // disable(addButton);
  };

  return (
    <>
      <form onSubmit={handleAddGoal}>
        <div>
          <label htmlFor="goalInput">I want to</label>
          <input
            name="myGoal"
            type="text"
            id="goalInput"
            // value={myGoal}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="repetitionCheckbox">set repetition:</label>
          <input
            name="repetition"
            type="checkbox"
            id="repetitionCheckbox"
            checked={newGoal.repetition}
            onChange={handleChange}
          />
        </div>
        {newGoal.repetition && (
          <>
            <div>
              <button
                type="button"
                onClick={() =>
                  handleTargetPerIntervalChange(
                    targetPerInterval < 2 ? 1 : targetPerInterval - 1
                  )
                }
              >
                -
              </button>
              <span>{newGoal.targetPerInterval}</span>
              <button
                type="button"
                onClick={() =>
                  handleTargetPerIntervalChange(targetPerInterval + 1)
                }
              >
                +
              </button>
            </div>

            <div>
              <label htmlFor="intervalSelect">set interval</label>
              <select
                name="interval"
                id="intervalSelect"
                value={newGoal.interval}
                onChange={handleChange}
              >
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
              </select>
            </div>
          </>
        )}
        <div>
          <label htmlFor="setDeadlineCheckbox">set deadline</label>
          <input
            name="deadlineVisible"
            type="checkbox"
            id="setDeadlineCheckbox"
            checked={newGoal.deadlineVisible}
            onChange={handleChange}
          />
        </div>
        {newGoal.deadlineVisible && (
          <div>
            <input
              name="deadline"
              type="date"
              id="deadlineInput"
              value={newGoal.deadline}
              onChange={handleChange}
            />
          </div>
        )}
        <button type="submit" disabled={!newGoal.myGoal}>
          Add your goal
        </button>
      </form>
    </>
  );
}
