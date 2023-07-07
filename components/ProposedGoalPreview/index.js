import Image from "next/image";

export default function ProposedGoalPreview({ image, title }) {
  return (
    <>
      <div>
        <Image src={image} alt={title} width={48} height={48} />
        <p>{title}</p>
      </div>
    </>
  );
}
