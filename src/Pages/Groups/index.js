import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createGroup, deleteGroup, deleteAllGroups } from '../../actions';
import AddGroup from './AddGroup';

class Groups extends Component {
  render() {
    const {
      groupList,
      groupIDs,
      createGroup,
      deleteGroup,
      coachList,
      studentList,
    } = this.props;

    return (
      <React.Fragment>
        <button type="button" onClick={() => deleteAllGroups()}>
          delete all
        </button>
        <AddGroup onAdd={createGroup} />
        {groupIDs.map(ID => {
          return (
            <div key={ID}>
              work: {groupList[ID].work}
              members:
              <ul>
                {groupList[ID].members.map(studentID => {
                  studentList[studentID] || deleteGroup(ID);
                  return (
                    <li key={studentID}>
                      {studentList[studentID].name},
                      {studentList[studentID].instrument}
                    </li>
                  );
                })}
              </ul>
              coach: {coachList[groupList[ID].coachID].name}
              delete:
              <button type="button" onClick={() => deleteGroup(ID)}>
                delete group
              </button>
              <hr />
            </div>
          );
        })}
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Groups);
