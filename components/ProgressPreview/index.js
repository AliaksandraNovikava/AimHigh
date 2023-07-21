import {
  StyledBox,
  StyledCardContent,
  StyledIconBox,
  StyledImage,
  StyledTitle,
} from "../NewGoalPreview";
import Icon from "@mdi/react";
import { mdiCheckBold, mdiFire } from "@mdi/js";
import { useContext } from "react";
import { MarkedDaysContext } from "../NewGoalDetails";

export default function ProgressPreview({ image, title }) {
  const { markedDays, setMarkedDays } = useContext(MarkedDaysContext);
  console.log("markedDays", markedDays);
  return (
    <StyledBox alignitems="center">
      <StyledCardContent>
        <StyledImage src={image} alt={title} width={30} height={30} />
        <StyledTitle fontsize="0.9em">{title}</StyledTitle>
      </StyledCardContent>
      <StyledIconBox>
        <StyledBox alignitems="center" justifycontent="center">
          <Icon path={mdiFire} size={1} color="#f14c01" />
          <p>{markedDays.length}</p>
        </StyledBox>
      </StyledIconBox>
    </StyledBox>
  );
}
