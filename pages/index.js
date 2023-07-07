import ProposedGoalsList from "@/components/ProposedGoalsList";
import styled from "styled-components";

const StyledHeading = styled.h2`
  font-size: 21px;
  font-weight: 500;
  line-height: 1.5;
`;

export default function HomePage({ goals, categoryColors }) {
  return (
    <>
      <StyledHeading>Choose goal</StyledHeading>
      <ProposedGoalsList goals={goals} categoryColors={categoryColors} />
    </>
  );
}
