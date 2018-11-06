import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TrashAlt as Delete } from 'styled-icons/fa-solid';
import Button from '../../components/Button';
import Editable from '../../components/Editable';
import Table from '../../components/Table';
import { Title } from '../../components/Common';
import {
  addStudent,
  deleteStudent,
  deleteAllStudents,
  changeStudentName,
  changeStudentInst,
} from '../../actions';
import AddStudent from './AddStudent';

class Students extends Component {
  renderTable = () => {
    const {
      studentList,
      studentIDs,
      deleteStudent,
      groupList,
      changeStudentName,
      changeStudentInst,
    } = this.props;
    const data = {
      headers: ['Name', 'instrument', 'delete'],
      values: studentIDs.map(ID => ({
        ID,
        name: (
          <Editable onConfirm={e => changeStudentName({ ID, name: e })}>
            <div style={{ width: '100%', padding: '4px', outline: 'none' }}>
              {studentList[ID].name}
            </div>
          </Editable>
        ),
        instrument: (
          <Editable onConfirm={e => changeStudentInst({ ID, instrument: e })}>
            <div style={{ width: '100%', padding: '4px', outline: 'none' }}>
              {studentList[ID].instrument}
            </div>
          </Editable>
        ),
        delete: (
          <Delete size={12} onClick={() => deleteStudent({ ID, groupList })} />
        ),
      })),
    };
    return <Table data={data} />;
  };
  render() {
    const { addStudent, deleteAllStudents } = this.props;
    return (
      <React.Fragment>
        <AddStudent onAdd={addStudent} />
        <Title m={3}>Students:</Title>
        {this.renderTable()}
        <Button m={3} onClick={() => deleteAllStudents()}>
          delete all
        </Button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  studentList: state.students.studentList,
  studentIDs: state.students.studentIDs,
  groupList: state.groups.groupList,
});

const mapDispatchToProps = {
  addStudent,
  deleteStudent,
  deleteAllStudents,
  changeStudentInst,
  changeStudentName,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Students);
