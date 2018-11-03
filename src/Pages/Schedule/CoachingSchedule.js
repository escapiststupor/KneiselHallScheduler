import React from 'react';
import { COACHING_TIMESLOT } from '../../constants';
import {
  CoachLabel,
  GroupName,
  TimeSlotLabel,
  GroupContainer,
  RoomLabel,
} from '../../components/Common';

const RehearsalSchedule = ({
  numOfTimeSlots,
  solution,
  groups,
  groupList,
  coachList,
  coachingDays,
}) => {
  let scheduleTable = [];
  for (let i = 1; i <= numOfTimeSlots; i++) {
    scheduleTable.push(
      <TimeSlotLabel key={`${coachingDays}_${i}`}>
        {COACHING_TIMESLOT[i]}
      </TimeSlotLabel>
    );
    groups.forEach((groupID, j) => {
      if (solution[j] === i) {
        scheduleTable.push(
          <GroupName key={groupID}>
            {groupList[groupID].work} <RoomLabel />
          </GroupName>
        );
        scheduleTable.push(
          <CoachLabel m={1} key={`${groupID}_coach`}>
            {coachList[groupList[groupID].coachID].name}
          </CoachLabel>
        );
      }
    });
  }
  return <GroupContainer>{scheduleTable}</GroupContainer>;
};

export default RehearsalSchedule;
