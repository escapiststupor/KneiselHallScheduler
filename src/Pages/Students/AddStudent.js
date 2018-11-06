import React, { Component } from 'react';
import { getHashID } from '../../utils';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Card, Title, Error } from '../../components/Common';

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
      <Card>
        <Title m={1}>Add new student:</Title>
        <Input
          width={200}
          placeholder="enter name"
          value={name}
          onChange={this.handleChangeField('name')}
          m={3}
        />
        <Input
          width={200}
          placeholder="enter instrument"
          value={instrument}
          onChange={this.handleChangeField('instrument')}
          m={3}
        />
        <Button onClick={this.onSave}>add</Button>
        {err && <Error>{err}</Error>}
      </Card>
    );
  }
}

export default AddStudent;
