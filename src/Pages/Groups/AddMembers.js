import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from '../../components/Select';

class AddMembers extends Component {
  state = { selectedID: '' };

  onChange = selectedID => {
    const { onAddID } = this.props;
    this.setState({ selectedID });
    onAddID(selectedID);
  };

  makeOptions = () => {
    const { studentIDs, studentList } = this.props;
    return studentIDs.sort().map(studentID => ({
      ID: studentID,
      text: studentList[studentID].name,
    }));
  };

  render() {
    const { selectedID } = this.state;
    return (
      <Select
        onChange={this.onChange}
        options={this.makeOptions()}
        value={selectedID}
      />
    );
  }
}

const mapStateToProps = state => ({
  studentList: state.students.studentList,
  studentIDs: state.students.studentIDs,
});

export default connect(mapStateToProps)(AddMembers);
