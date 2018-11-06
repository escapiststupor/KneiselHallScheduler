import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Title } from '../../components/Common';
import RehearsalSchedule from './RehearsalSchedule';
import CoachingSchedule from './CoachingSchedule';
import GroupList from './GroupList';

import {
  makeCoachingGraph,
  makeRehearsalGraph,
  tryScheduling,
} from '../../modules/scheduler';

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

  render() {
    const {
      loading,
      solution_RE,
      solution_MW,
      solution_TT,
      groupIDs,
      groupMWIDs,
      groupTTIDs,
    } = this.state;
    const { groupList, coachList } = this.props;
    if (loading) return <p>loading</p>; // I don't think the event loop goes to the render phase tho
    const NumOfRESlots = Math.max(...solution_RE);
    const NumOfMWSlots = Math.max(...solution_MW);
    const NumOfTTSlots = Math.max(...solution_TT);
    return (
      <React.Fragment>
        <Title ml={3}>Groups</Title>
        <GroupList />
        <Title mt={3} ml={3}>
          Daily Rehearsal Schedule
        </Title>
        <RehearsalSchedule
          numOfTimeSlots={NumOfRESlots}
          solution={solution_RE}
          groups={groupIDs}
          groupList={groupList}
        />
        <Title mt={3} ml={3}>
          Mon/Wed Coaching Schedule
        </Title>
        <CoachingSchedule
          numOfTimeSlots={NumOfMWSlots}
          solution={solution_MW}
          groups={groupMWIDs}
          groupList={groupList}
          coachList={coachList}
          coachingDays="MW"
        />
        <Title mt={3} ml={3}>
          Tue/Thu Coaching Schedule
        </Title>
        <CoachingSchedule
          numOfTimeSlots={NumOfTTSlots}
          solution={solution_TT}
          groups={groupTTIDs}
          groupList={groupList}
          coachList={coachList}
          coachingDays="TT"
        />
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
