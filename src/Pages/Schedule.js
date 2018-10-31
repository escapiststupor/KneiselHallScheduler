import React, { Component } from 'react';
import { connect } from 'react-redux';

class Schedule extends Component {
  state = {
    loading: true,
    success: false,
  };
  render() {
    const { loading } = this.state;
    if (loading) return <p>loading</p>;
    return (
      <div>
        <p>JUST SOME TEXT</p>
      </div>
    );
  }
}
const mapStateToProps = state => ({});

const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Schedule);
