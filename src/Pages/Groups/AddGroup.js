import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getHashID } from '../../utils';
import AddMembers from './AddMembers';

const initialState = {
  work: '',
  coachID: '',
  members: [],
};

class AddGroup extends Component {
  state = initialState;

  handleChangeField = fieldName => e =>
    this.setState({ [fieldName]: e.target.value, err: '' });

  onSave = () => {
    const { work, coachID, members } = this.state;
    if (!work.trim() || !coachID || !members.length) {
      this.setState({ err: 'all fields required' });
      return;
    }

    this.props.onAdd({
      id: getHashID(),
      work: work.trim(),
      coachID,
      members,
    });
    this.setState(initialState);
  };

  onAddMember = ID => this.setState({ members: [...this.state.members, ID] });
  onRemoveMember = ID =>
    this.setState({
      members: this.state.members.filter(existingID => existingID !== ID),
    });

  render() {
    const { work, coachID, members, err } = this.state;
    const { coachList, coachIDs, studentList } = this.props;
    return (
      <div>
        <input
          placeholder="Composer: work"
          value={work}
          onChange={this.handleChangeField('work')}
        />
        <label>
          Coach:
          <select value={coachID} onChange={this.handleChangeField('coachID')}>
            <option disabled value="">
              select
            </option>
            {coachIDs.map(coachID => (
              <option key={coachID} value={coachID}>
                {coachList[coachID].name}
              </option>
            ))}
          </select>
        </label>
        <hr />
        <AddMembers onAddID={this.onAddMember} />
        <h4>Members:</h4>
        {members.map(studentID => (
          <div key={studentID}>
            <p>
              {studentList[studentID].name}, {studentList[studentID].instrument}
            </p>
            <button
              type="button"
              onClick={() => this.onRemoveMember(studentID)}
            >
              -
            </button>
          </div>
        ))}
        <hr />
        <button type="button" onClick={this.onSave}>
          create group
        </button>
        <p>{err}</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  coachList: state.coaches.coachList,
  coachIDs: state.coaches.coachIDs,
  studentIDs: state.students.studentIDs,
  studentList: state.students.studentList,
});

export default connect(mapStateToProps)(AddGroup);
