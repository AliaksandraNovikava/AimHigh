import { render, screen } from "@testing-library/react";
import NewGoalPreview from "./NewGoalPreview";

const mockGoal = {
  id: 1,
  image: "/goalImage.png",
  title: "Goal 1",
  creationDate: "2023-07-31",
  isChecked: false,
};

test("renders the goal title", () => {
  render(
    <NewGoalPreview
      image={mockGoal.image}
      title={mockGoal.title}
      creationDate={mockGoal.creationDate}
      isChecked={mockGoal.isChecked}
    />
  );

  const goalTitle = screen.getByText("Goal 1");

  expect(goalTitle).toBeInTheDocument();
});

test("renders the goal creation date", () => {
  render(
    <NewGoalPreview
      image={mockGoal.image}
      title={mockGoal.title}
      creationDate={mockGoal.creationDate}
      isChecked={mockGoal.isChecked}
    />
  );

  const creationDate = screen.getByText("Created on 2023-07-31");

  expect(creationDate).toBeInTheDocument();
});
