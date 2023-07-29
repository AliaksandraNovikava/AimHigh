import styled from "styled-components";
import NewGoalPreview from "../NewGoalPreview";
import { EmptyStateMessage } from "@/pages/statistics";
import Link from "next/link";
import Lottie from "lottie-react";
import animation from "@/public/animation/animation_lkoduokv.json";

export const StyledList = styled.div`
  padding-bottom: 25px;
`;

export const StyledCard = styled.article`
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 15px;
  background-color: ${(props) => props.backgroundcolor};
  box-shadow: ${(props) => props.boxshadow};
`;

export const LinkButton = styled(Link)`
  padding: 10px 23px;
  margin-top: 20px;
  background-color: #000;
  color: #fff;
  border-radius: 10px;
  text-align: center;
  font-size: 1em;
  text-decoration: none;
`;

export default function NewGoalsList({
  handleToggleChecked,
  onOpenModal,
  uncheckedGoals,
}) {
  return (
    <StyledList>
      {uncheckedGoals.map((goal) => (
        <StyledCard
          key={goal.id}
          backgroundcolor="#f6f5f8"
          boxshadow="0 2px 6px rgb(109 94 255 / 10%)"
        >
          <NewGoalPreview
            image={goal.icon}
            title={goal.name}
            creationDate={goal.creationDate}
            handleToggleChecked={handleToggleChecked}
            id={goal.id}
            isChecked={goal.isChecked}
            onOpenModal={onOpenModal}
            goal={goal}
          />
        </StyledCard>
      ))}
      {uncheckedGoals.length === 0 && (
        <div>
          <EmptyStateMessage margin="0 0 30px">
            No goals set yet. <br></br>Start by setting your first goal and{" "}
            <strong>aim high</strong>!
          </EmptyStateMessage>
          <LinkButton href="/">Get started</LinkButton>
          <div>
            <Lottie
              animationData={animation}
              loop={false}
              autoplay={true}
              speed={0.5}
              style={{ maxWidth: "400px" }}
            />
          </div>
        </div>
      )}
    </StyledList>
  );
}
