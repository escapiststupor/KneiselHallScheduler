import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  makeCoachingGraph,
  makeRehearsalGraph,
  tryScheduling,
} from '../modules/scheduler';
import { COACHING_TIMESLOT, REHEARSAL_TIMESLOT } from '../constants';

class Schedule extends Component {
  state = {
    loading: true,
  };

  componentDidMount = () => {
    const { groupList, coachList, groupIDs } = this.props;
    const { G: G_MW, groupIDs: groupMWIDs } = makeCoachingGraph({
      groupList,
      coachList,
      groupIDs,
      acceptedDays: 'MW',
    });
    const { G: G_TT, groupIDs: groupTTIDs } = makeCoachingGraph({
      groupList,
      coachList,
      groupIDs,
      acceptedDays: 'TT',
    });
    const { G: G_RE } = makeRehearsalGraph({ groupList, groupIDs });

    const solution_MW = tryScheduling(G_MW);
    const solution_TT = tryScheduling(G_TT);
    const solution_RE = tryScheduling(G_RE);
    this.setState({
      loading: false,
      groupMWIDs,
      solution_MW,
      groupTTIDs,
      solution_TT,
      groupIDs,
      solution_RE,
    });
  };

  getGroupNameByID = ID => {
    const { groupList } = this.props;
    return groupList[ID].work;
  };

  makeMWTable = () => {
    const { solution_MW, groupMWIDs } = this.state;
    console.log('solution_MW', solution_MW);
    console.log('groupMWIDs', groupMWIDs);
    return (
      <React.Fragment>
        {groupMWIDs.map((groupID, i) => (
          <div key={groupID}>
            group {this.getGroupNameByID(groupID)} coaches on MW{' '}
            {COACHING_TIMESLOT[solution_MW[i]]}
          </div>
        ))}
      </React.Fragment>
    );
  };

  makeTTTable = () => {
    const { solution_TT, groupTTIDs } = this.state;
    console.log('solution_TT', solution_TT);
    console.log('groupTTIDs', groupTTIDs);
    return (
      <React.Fragment>
        {groupTTIDs.map((groupID, i) => (
          <div key={groupID}>
            group {this.getGroupNameByID(groupID)} coaches on TT{' '}
            {COACHING_TIMESLOT[solution_TT[i]]}
          </div>
        ))}
      </React.Fragment>
    );
  };

  makeRETable = () => {
    const { solution_RE, groupIDs } = this.state;
    console.log('solution_RE', solution_RE);
    console.log('groupIDs', groupIDs);
    return (
      <React.Fragment>
        {groupIDs.map((groupID, i) => (
          <div key={groupID}>
            group {this.getGroupNameByID(groupID)} rehearses everyday{' '}
            {REHEARSAL_TIMESLOT[solution_RE[i]]}
          </div>
        ))}
      </React.Fragment>
    );
  };

  render() {
    const { loading } = this.state;
    if (loading) return <p>loading</p>;
    return (
      <React.Fragment>
        <div>{this.makeMWTable()}</div>
        <div>{this.makeTTTable()}</div>
        <div>{this.makeRETable()}</div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  groupList: state.groups.groupList,
  groupIDs: state.groups.groupIDs,
  coachList: state.coaches.coachList,
});

const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Schedule);
