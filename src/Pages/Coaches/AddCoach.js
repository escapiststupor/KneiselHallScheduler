import React, { Component } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from '../../components/Select';
import { Card, Title, Error } from '../../components/Common';
import { getHashID } from '../../utils';

const initialState = {
  name: '',
  coachingDays: 'MW',
  err: '',
};

class AddCoach extends Component {
  state = initialState;

  handleChangeField = fieldName => e =>
    this.setState({ [fieldName]: e.target.value, err: '' });

  onSave = () => {
    const { name, coachingDays } = this.state;
    if (!name.trim()) {
      this.setState({ err: 'all fields required' });
      return;
    }

    const id = getHashID(name);
    this.props.onAdd({
      id,
      name: name.trim(),
      coachingDays,
    });
    this.setState(initialState);
  };

  render() {
    const { name, coachingDays, err } = this.state;
    return (
      <Card>
        <Title m={1}>Add new coach:</Title>
        <Input
          width={200}
          placeholder="enter name"
          value={name}
          onChange={this.handleChangeField('name')}
          m={1}
        />
        <Select
          title="coaches on"
          options={[
            { ID: 'MW', text: 'Mon/Wed' },
            { ID: 'TT', text: 'Tue/Thu' },
          ]}
          onChange={coachingDays => this.setState({ coachingDays })}
          value={coachingDays}
          m={1}
        />
        <Button onClick={this.onSave}>add</Button>
        {err && <Error>{err}</Error>}
      </Card>
    );
  }
}

export default AddCoach;
