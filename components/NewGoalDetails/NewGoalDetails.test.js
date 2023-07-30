import { render, screen, fireEvent } from "@testing-library/react";
import NewGoalDetails from "./NewGoalDetails";

const mockSelectedGoal = {
  id: 1,
  icon: "/icon.png",
  name: "Goal 1",
  targetPerInterval: 3,
  interval: "day",
  deadline: "2023-08-10",
};

test("renders the selected goal details", () => {
  render(
    <NewGoalDetails
      selectedGoal={mockSelectedGoal}
      isModalOpen={true}
      closeModal={() => {}}
      onEditGoal={() => {}}
      onSaveEdit={() => {}}
      onCancelEdit={() => {}}
      onEdit={() => {}}
      onDeleteGoal={() => {}}
      isEditing={false}
      updateGoalWithDays={() => {}}
    />
  );

  const goalName = screen.getByText("Goal 1");
  const goalContent = screen.getByText("3 time(s) a day");
  const goalDeadline = screen.getByText("Deadline: 2023-08-10");

  expect(goalName).toBeInTheDocument();
  expect(goalContent).toBeInTheDocument();
  expect(goalDeadline).toBeInTheDocument();
});
