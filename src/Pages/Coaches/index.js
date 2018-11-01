import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCoach, deleteCoach, deleteAllCoaches } from '../../actions';
import AddCoach from './AddCoach';

class Coaches extends Component {
  render() {
    const {
      coachList,
      coachIDs,
      addCoach,
      deleteCoach,
      deleteAllCoaches,
    } = this.props;
    return (
      <React.Fragment>
        <AddCoach onAdd={addCoach} />
        <button type="button" onClick={() => deleteAllCoaches()}>
          delete all
        </button>
        {coachIDs.map(ID => (
          <div key={ID}>
            teacher: {coachList[ID].name}
            coaches on: {coachList[ID].coachingDays}
            coaches in: {coachList[ID].room}
            delete:
            <button type="button" onClick={() => deleteCoach(ID)}>
              -
            </button>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  coachList: state.coaches.coachList,
  coachIDs: state.coaches.coachIDs,
});

const mapDispatchToProps = {
  addCoach,
  deleteCoach,
  deleteAllCoaches,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Coaches);
