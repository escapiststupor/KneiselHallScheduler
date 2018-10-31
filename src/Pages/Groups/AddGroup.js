import React, { Component } from 'react';
import { getHashID } from '../../utils';

const initialState = {
  work: '',
  coachID: '',
  memberIDs: [],
};

class AddGroup extends Component {
  state = initialState;

  handleChangeField = fieldName => e =>
    this.setState({ [fieldName]: e.target.value, err: '' });

  onSave = () => {
    const { work, coachID } = this.state;
    if (!work.trim() || !coachID) {
      this.setState({ err: 'all fields required' });
      return;
    }

    const id = getHashID(work);
    this.props.onAdd({
      id,
      work: work.trim(),
      coach: coachID,
    });
    this.setState(initialState);
  };

  render() {
    const { work, coach, err } = this.state;
    return (
      <div>
        <input
          placeholder="work"
          value={work}
          onChange={this.handleChangeField('work')}
        />
        <input
          placeholder="coach"
          value={coach}
          onChange={this.handleChangeField('coach')}
        />
        <button type="button" onClick={this.onSave}>
          add
        </button>
        <p>{err}</p>
      </div>
    );
  }
}

export default AddGroup;
