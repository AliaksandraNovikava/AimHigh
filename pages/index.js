import ProposedGoalsList from "@/components/ProposedGoalsList";

export default function HomePage({ goals, categoryColors }) {
  return (
    <div>
      <h1>Choose goal</h1>
      <ProposedGoalsList goals={goals} categoryColors={categoryColors} />
    </div>
  );
}
