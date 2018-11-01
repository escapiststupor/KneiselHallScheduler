import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addStudent, deleteStudent, deleteAllStudents } from '../../actions';
import AddStudent from './AddStudent';

class Students extends Component {
  render() {
    const {
      studentList,
      studentIDs,
      addStudent,
      deleteStudent,
      deleteAllStudents,
    } = this.props;
    return (
      <React.Fragment>
        <AddStudent onAdd={addStudent} />
        <button type="button" onClick={() => deleteAllStudents()}>
          delete all
        </button>
        {studentIDs.map(ID => (
          <div key={ID}>
            student: {studentList[ID].name}
            instrument: {studentList[ID].instrument}
            delete:
            <button type="button" onClick={() => deleteStudent(ID)}>
              -
            </button>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  studentList: state.students.studentList,
  studentIDs: state.students.studentIDs,
});

const mapDispatchToProps = {
  addStudent,
  deleteStudent,
  deleteAllStudents,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Students);
