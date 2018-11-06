import React from 'react';
import { REHEARSAL_TIMESLOT } from '../../constants';
import {
  GroupName,
  GroupContainer,
  TimeSlotLabel,
  RoomLabel,
} from '../../components/Common';

const RehearsalSchedule = ({ numOfTimeSlots, solution, groups, groupList }) => {
  let scheduleTable = [];
  for (let i = 1; i <= numOfTimeSlots; i++) {
    scheduleTable.push(
      <TimeSlotLabel key={`RE_time_${i}`}>
        {REHEARSAL_TIMESLOT[i]}
      </TimeSlotLabel>
    );
    groups.forEach((groupID, j) => {
      if (solution[j] === i) {
        scheduleTable.push(
          <GroupName key={groupID}>
            {groupList[groupID].work} <RoomLabel />
          </GroupName>
        );
      }
    });
  }
  return <GroupContainer>{scheduleTable}</GroupContainer>;
};

export default RehearsalSchedule;
