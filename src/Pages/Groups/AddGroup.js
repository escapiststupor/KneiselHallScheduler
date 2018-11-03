import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getHashID } from '../../utils';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from '../../components/Select';
import Member from './Member';
import { Card, Title, Error, MemberManagement } from '../../components/Common';
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

  onChange = coachID => this.setState({ coachID, err: '' });

  onAddMember = ID => {
    const { members } = this.state;
    if (!members.includes(ID)) {
      this.setState({ members: [...members, ID] });
    } else {
      return;
    }
  };

  onRemoveMember = ID =>
    this.setState({
      members: this.state.members.filter(existingID => existingID !== ID),
    });

  makeCoachOptions = () => {
    const { coachList, coachIDs } = this.props;
    return coachIDs.sort().map(coachID => ({
      ID: coachID,
      text: coachList[coachID].name,
    }));
  };

  render() {
    const { work, members, err, coachID } = this.state;
    const { studentList } = this.props;
    return (
      <Card>
        <Title m={1}>Add new group</Title>
        <Input
          width={'80%'}
          placeholder="Mozart: String Quintet No.4 in G minor, K.516"
          value={work}
          onChange={this.handleChangeField('work')}
        />
        <Title m={1}>Coach:</Title>
        <Select
          options={this.makeCoachOptions()}
          onChange={this.onChange}
          value={coachID}
        />
        <Title m={1}>Edit members:</Title>
        <AddMembers onAddID={this.onAddMember} />
        <MemberManagement m={3}>
          {members.map(studentID => (
            <Member
              key={studentID}
              studentID={studentID}
              name={studentList[studentID].name}
              instrument={studentList[studentID].instrument}
              onClickRemove={() => this.onRemoveMember(studentID)}
            />
          ))}
        </MemberManagement>
        <Button onClick={this.onSave}>create group</Button>
        {err && <Error>{err}</Error>}
      </Card>
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
