import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Select from '../../components/Select';
import Editable from '../../components/Editable';
import { colors } from '../../components/style-variables';
import { DeleteForever } from 'styled-icons/material';
import {
  Card,
  Title,
  TopRightIcon,
  MemberManagement,
} from '../../components/Common';
import AddMembers from './AddMembers';
import Member from './Member';
import {
  deleteGroup,
  changeWork,
  changeCoach,
  deleteStudentFromGroup,
  addStudentToGroup,
} from '../../actions';

const Div = styled.div`
  overflow: hidden;
  width: calc(100%-16px);
  background-color: ${colors.bg};
  border: 1px solid rgba(0, 0, 0, 0.125);
  outline: none;
  padding: 8px;
  margin: 0;
`;

class GroupEdit extends Component {
  makeCoachOptions = () => {
    const { coachList, coachIDs } = this.props;
    return coachIDs.sort().map(coachID => ({
      ID: coachID,
      text: coachList[coachID].name,
    }));
  };

  componentDidMount = () => {
    const { groupID, changeCoach, groupList } = this.props;
    console.log('groupID', groupID);
    changeCoach({ groupID, coachID: groupList[groupID].coachID });
  };

  onAddMember = studentID => {
    const { groupList, groupID, addStudentToGroup } = this.props;
    const { members } = groupList[groupID];
    if (!members.includes(studentID)) {
      addStudentToGroup({ studentID, groupID });
    } else {
      return;
    }
  };

  render() {
    const {
      groupID,
      groupList,
      deleteGroup,
      studentList,
      changeCoach,
      changeWork,
      deleteStudentFromGroup,
    } = this.props;

    return (
      <Card>
        <Title m={1}>work to study</Title>
        <Editable onConfirm={e => changeWork({ groupID, work: e })}>
          <Div>{groupList[groupID].work}</Div>
        </Editable>
        <Title m={1}>Coach</Title>
        <Select
          options={this.makeCoachOptions()}
          onChange={coachID => changeCoach({ coachID, groupID })}
          value={groupList[groupID].coachID}
        />
        <Title m={1}>Edit members:</Title>
        <AddMembers onAddID={this.onAddMember} />
        <MemberManagement m={3}>
          {groupList[groupID].members.map(studentID => (
            <Member
              key={studentID}
              studentID={studentID}
              name={studentList[studentID].name}
              instrument={studentList[studentID].instrument}
              onClickRemove={() =>
                deleteStudentFromGroup({ studentID, groupID })
              }
            />
          ))}
        </MemberManagement>
        <TopRightIcon>
          <DeleteForever size={32} onClick={() => deleteGroup(groupID)} />
        </TopRightIcon>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  groupList: state.groups.groupList,
  groupIDs: state.groups.groupIDs,
  coachList: state.coaches.coachList,
  coachIDs: state.coaches.coachIDs,
  studentList: state.students.studentList,
  studentIDs: state.students.studentIDs,
});

const mapDispatchToProps = {
  changeWork,
  deleteGroup,
  changeCoach,
  deleteStudentFromGroup,
  addStudentToGroup,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupEdit);
