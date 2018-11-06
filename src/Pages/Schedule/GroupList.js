import React from 'react';
import { connect } from 'react-redux';
import {
  MemberLabel,
  CoachLabel,
  GroupName,
  GroupContainer,
} from '../../components/Common';

const GroupList = ({ coachList, studentList, groupList, groupIDs }) => (
  <React.Fragment>
    {groupIDs.map(groupID => (
      <GroupContainer key={groupID} m={3} p={2}>
        <GroupName>{groupList[groupID].work}</GroupName>
        <CoachLabel m={1}>
          {coachList[groupList[groupID].coachID].name}
        </CoachLabel>
        {groupList[groupID].members.map(memberID => (
          <MemberLabel key={memberID}>
            {studentList[memberID].name}, {studentList[memberID].instrument}
          </MemberLabel>
        ))}
      </GroupContainer>
    ))}
  </React.Fragment>
);

const mapStateToProps = state => ({
  coachList: state.coaches.coachList,
  studentList: state.students.studentList,
  groupList: state.groups.groupList,
  groupIDs: state.groups.groupIDs,
});

export default connect(mapStateToProps)(GroupList);
