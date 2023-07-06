import Image from "next/image";

export default function ProposedGoalPreview({ image, title }) {
  return (
    <>
      <div>
        <Image src={image} alt={title} width={136} height={136} />
        <p>{title}</p>
      </div>
    </>
  );
}
