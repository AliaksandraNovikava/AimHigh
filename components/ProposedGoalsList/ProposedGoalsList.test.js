import { render, screen } from "@testing-library/react";
import ProposedGoalsList from "./ProposedGoalsList";

const mockGoals = [
  {
    id: 1,
    icon: "/path/to/icon1.png",
    name: "Goal 1",
    category: "Sport",
  },
  {
    id: 2,
    icon: "/path/to/icon2.png",
    name: "Goal 2",
    category: "Health",
  },
];

const mockCategoryColors = {
  Sport: "#e1d0e9",
  Health: "#d8f2db",
};

test("renders the proposed goals", () => {
  render(
    <ProposedGoalsList goals={mockGoals} categoryColors={mockCategoryColors} />
  );

  const goal1Title = screen.getByText("Goal 1");
  expect(goal1Title).toBeInTheDocument();
});

test("renders the goal icons", () => {
  render(
    <ProposedGoalsList goals={mockGoals} categoryColors={mockCategoryColors} />
  );

  const goal1Icon = screen.getByAltText("Goal 1");
  expect(goal1Icon).toBeInTheDocument();
});
