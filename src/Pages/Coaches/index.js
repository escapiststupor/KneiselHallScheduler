import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TrashAlt as Delete } from 'styled-icons/fa-solid';
import Table from '../../components/Table';
import Button from '../../components/Button';
import Select from '../../components/Select';
import Editable from '../../components/Editable';
import { Title } from '../../components/Common';
import {
  addCoach,
  deleteCoach,
  deleteAllCoaches,
  changeCoachName,
  changeCoachingTime,
} from '../../actions';
import AddCoach from './AddCoach';

class Coaches extends Component {
  renderTable = () => {
    const {
      coachList,
      coachIDs,
      deleteCoach,
      groupList,
      changeCoachName,
      changeCoachingTime,
    } = this.props;
    const data = {
      headers: ['Name', 'coaches on', 'delete'],
      values: coachIDs.map(ID => ({
        ID,
        name: (
          <Editable onConfirm={e => changeCoachName({ ID, name: e })}>
            <div style={{ width: '100%', padding: '4px', outline: 'none' }}>
              {coachList[ID].name}
            </div>
          </Editable>
        ),
        coachingDays: (
          <Select
            options={[
              { ID: 'MW', text: 'Mon/Wed' },
              { ID: 'TT', text: 'Tue/Thu' },
            ]}
            onChange={e => changeCoachingTime({ ID, coachingDays: e })}
            value={coachList[ID].coachingDays}
            width="100px"
          />
        ),
        delete: (
          <Delete size={12} onClick={() => deleteCoach({ ID, groupList })} />
        ),
      })),
    };
    return <Table data={data} />;
  };
  render() {
    const { addCoach, deleteAllCoaches } = this.props;
    return (
      <React.Fragment>
        <AddCoach onAdd={addCoach} />
        <Title m={3}>Coaches:</Title>
        {this.renderTable()}
        <Button onClick={() => deleteAllCoaches()}>
          delete all
        </Button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  coachList: state.coaches.coachList,
  coachIDs: state.coaches.coachIDs,
  groupList: state.groups.groupList,
});

const mapDispatchToProps = {
  addCoach,
  deleteCoach,
  deleteAllCoaches,
  changeCoachName,
  changeCoachingTime,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Coaches);
