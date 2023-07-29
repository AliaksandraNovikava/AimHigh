import { StyledList, StyledCard } from "@/components/NewGoalsList/index.js";
import NewGoalPreview from "../NewGoalPreview";
import { EmptyStateMessage } from "@/pages/statistics";
import Lottie from "lottie-react";
import animation from "@/public/animation/animation_lkoduokv.json";

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
      {checkedGoals.length === 0 && (
        <div>
          <EmptyStateMessage>
            No achievements yet. <br></br>Keep working hard and accomplishing
            your goals to unlock your achievements!
          </EmptyStateMessage>
          <Lottie
            animationData={animation}
            loop={false}
            autoplay={true}
            speed={0.5}
            style={{ maxWidth: "400px" }}
          />
        </div>
      )}
    </StyledList>
  );
}
