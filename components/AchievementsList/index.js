import { StyledList, StyledCard } from "@/components/NewGoalsList/index.js";
import NewGoalPreview from "../NewGoalPreview";

export default function AchievementsList({
  checkedGoals,
  handleToggleChecked,
  onOpenModal,
}) {
  return (
    <StyledList>
      {checkedGoals.map((goal) => (
        <StyledCard key={goal.id} boxshadow="0 2px 6px rgb(109 94 255 / 10%)">
          <NewGoalPreview
            image={goal.icon}
            title={goal.name}
            creationDate={goal.creationDate}
            id={goal.id}
            isChecked={goal.isChecked}
            onOpenModal={onOpenModal}
            handleToggleChecked={handleToggleChecked}
            goal={goal}
          />
        </StyledCard>
      ))}
    </StyledList>
  );
}
