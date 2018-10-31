import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createGroup, deleteGroup } from '../../actions';
import AddGroup from './AddGroup';

class Groups extends Component {
  render() {
    const {
      groupList,
      groupIDs,
      coachList,
      coachIDs,
      createGroup,
      deleteGroup,
    } = this.props;
    return (
      <React.Fragment>
        <AddGroup
          onAdd={createGroup}
          coachList={coachList}
          coachIDs={coachIDs}
        />
        {groupIDs.map(ID => (
          <div key={ID}>
            work: {groupList[ID].work}
            members: {groupList[ID].members}
            coach: {groupList[ID].coach}
            delete:
            <button type="button" onClick={() => deleteGroup(ID)}>
              -
            </button>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  groupList: state.groups.groupList,
  groupIDs: state.groups.groupIDs,
  coachList: state.coaches.coachList,
  coachIDs: state.coaches.coachIDs,
});

const mapDispatchToProps = {
  createGroup,
  deleteGroup,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Groups);
