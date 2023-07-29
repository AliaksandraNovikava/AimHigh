import SetGoalsStatistics from "@/components/SetGoalsStatistics";
import ActiveGoalsProgress from "@/components/ActiveGoalsProgress";
import Deadlines from "@/components/Deadlines";
import { StyledHeading } from "..";
import styled from "styled-components";
import { useState } from "react";

const Tabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  overflow: hidden;
`;

const TabInput = styled.input.attrs({ type: "radio" })`
  border-bottom: 1px solid rgba(239, 237, 239, 0.5);
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: block;
  width: 100%;
  transition: all 0.3s ease-in-out;

  &:checked {
    border-bottom: 2px solid #000;
  }
`;

const TabLabel = styled.label`
  font-size: 21px;
  font-weight: 500;
  line-height: 1.5;
  cursor: pointer;
  display: block;
  padding: 0.7rem 0;
  text-align: center;
  ${TabInput}:checked + & {
    color: red;
  }
`;

const TabContent = styled.div`
  display: block;
  opacity: 0;
  padding: 2rem 0;
  width: 90%;
  transition: all 0.3s ease-in-out;

  ${TabInput}:checked + & {
    opacity: 1;
  }
`;

const Tab = styled.div`
  width: 50%;

  ${TabInput}:checked + ${TabContent} {
    margin-left: 0;
  }

  &:last-child {
    ${TabInput}:checked + ${TabContent} {
      margin-left: -100%;
    }
  }

  ${TabInput} + ${TabContent} {
    width: 200%;
    margin-left: 200%;
  }
`;

export default function StatisticsPage({ uncheckedGoals, checkedGoals }) {
  const [selectedTab, setSelectedTab] = useState("progress");
  function handleTabChange(event) {
    setSelectedTab(event.target.value);
  }
  return (
    <>
      <StyledHeading>Statistics</StyledHeading>
      <SetGoalsStatistics
        checkedGoals={checkedGoals}
        uncheckedGoals={uncheckedGoals}
      />

      <Tabs>
        <Tab>
          <TabLabel htmlFor="progress">My Progress</TabLabel>
          <TabInput
            id="progress"
            name="statistics"
            type="radio"
            value="progress"
            checked={selectedTab === "progress"}
            onChange={handleTabChange}
          />
          <TabContent>
            <ActiveGoalsProgress uncheckedGoals={uncheckedGoals} />
          </TabContent>
        </Tab>
        <Tab>
          <TabLabel htmlFor="deadlines">Deadlines</TabLabel>
          <TabInput
            id="deadlines"
            name="statistics"
            type="radio"
            value="deadlines"
            checked={selectedTab === "deadlines"}
            onChange={handleTabChange}
          />
          <TabContent>
            <Deadlines uncheckedGoals={uncheckedGoals} />
          </TabContent>
        </Tab>
      </Tabs>
    </>
  );
}
