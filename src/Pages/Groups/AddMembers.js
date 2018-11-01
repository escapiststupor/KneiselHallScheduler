import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddMembers extends Component {
  state = { selectedID: '' };

  handleChange = e => this.setState({ selectedID: e.target.value });

  render() {
    const { onAddID, studentIDs, studentList } = this.props;
    const { selectedID } = this.state;
    return (
      <React.Fragment>
        <label>
          <select value={selectedID} onChange={this.handleChange}>
            <option disabled value="">
              select
            </option>
            {studentIDs.map(studentID => (
              <option key={studentID} value={studentID}>
                {studentList[studentID].name}
              </option>
            ))}
          </select>
        </label>
        <button type="button" onClick={() => onAddID(selectedID)}>
          add to group
        </button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  studentList: state.students.studentList,
  studentIDs: state.students.studentIDs,
});

export default connect(mapStateToProps)(AddMembers);
