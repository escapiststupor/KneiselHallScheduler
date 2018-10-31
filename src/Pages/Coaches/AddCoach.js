import React, { Component } from 'react';
import { getHashID } from '../../utils';

const initialState = {
  name: '',
  coachingDays: 'MW',
  room: '',
  err: '',
};

class AddCoach extends Component {
  state = initialState;

  handleChangeField = fieldName => e =>
    this.setState({ [fieldName]: e.target.value, err: '' });

  onSave = () => {
    const { name, coachingDays, room } = this.state;
    if (!name.trim() || !room.trim()) {
      this.setState({ err: 'all fields required' });
      return;
    }

    const id = getHashID(name);
    this.props.onAdd({
      id,
      name: name.trim(),
      coachingDays,
      room: room.trim(),
    });
    this.setState(initialState);
  };

  render() {
    const { name, coachingDays, room, err } = this.state;
    return (
      <div>
        <input
          placeholder="name"
          value={name}
          onChange={this.handleChangeField('name')}
        />
        <input
          onChange={this.handleChangeField('coachingDays')}
          type="radio"
          id="MW"
          name="coachingDays"
          value="MW"
          checked={coachingDays === 'MW'}
        />
        <label htmlFor="MW">Mon/Wed</label>
        <input
          onChange={this.handleChangeField('coachingDays')}
          type="radio"
          id="TT"
          name="coachingDays"
          value="TT"
          checked={coachingDays === 'TT'}
        />
        <label htmlFor="TT">Tue/Thu</label>
        <input
          placeholder="room"
          value={room}
          onChange={this.handleChangeField('room')}
        />
        <button type="button" onClick={this.onSave}>
          add
        </button>
        <p>{err}</p>
      </div>
    );
  }
}

export default AddCoach;
