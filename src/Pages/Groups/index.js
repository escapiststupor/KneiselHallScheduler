import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from '../../components/Button';
import { createGroup, deleteGroup, deleteAllGroups } from '../../actions';
import AddGroup from './AddGroup';
import { Card } from '../../components/Common';
import GroupEdit from './GroupEdit';

const GroupsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

class Groups extends Component {
  render() {
    const { groupIDs, createGroup, deleteAllGroups } = this.props;

    return (
      <React.Fragment>
        <AddGroup onAdd={createGroup} />
        <Button m={3} onClick={() => deleteAllGroups()}>
          delete all groups
        </Button>
        <hr />
        <GroupsContainer>
          {groupIDs.map(ID => (
            <GroupEdit key={ID} groupID={ID} />
          ))}
          <Card style={{ opacity: 0 }} />
          <Card style={{ opacity: 0 }} />
        </GroupsContainer>
      </React.Fragment>
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
  createGroup,
  deleteGroup,
  deleteAllGroups,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Groups);
