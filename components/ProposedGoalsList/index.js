import ProposedGoalPreview from "../ProposedGoalPreview/index.js";

export default function ProposedGoalsList({ goals }) {
  return (
    <>
      {goals.map((goal) => (
        <div key={goal.id}>
          <ProposedGoalPreview image={goal.icon} title={goal.name} />
        </div>
      ))}
    </>
  );
}
