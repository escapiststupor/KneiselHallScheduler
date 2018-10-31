import React, { Component } from 'react';
import { getHashID } from '../../utils';

const initialState = {
  name: '',
  instrument: '',
};

class AddStudent extends Component {
  state = initialState;

  handleChangeField = fieldName => e =>
    this.setState({ [fieldName]: e.target.value, err: '' });

  onSave = () => {
    const { name, instrument } = this.state;
    if (!name.trim() || !instrument.trim()) {
      this.setState({ err: 'all fields required' });
      return;
    }

    const id = getHashID(name);
    this.props.onAdd({
      id,
      name: name.trim(),
      instrument: instrument.trim(),
    });
    this.setState(initialState);
  };

  render() {
    const { name, instrument, err } = this.state;
    return (
      <div>
        <input
          placeholder="name"
          value={name}
          onChange={this.handleChangeField('name')}
        />
        <input
          placeholder="instrument"
          value={instrument}
          onChange={this.handleChangeField('instrument')}
        />
        <button type="button" onClick={this.onSave}>
          add
        </button>
        <p>{err}</p>
      </div>
    );
  }
}

export default AddStudent;
