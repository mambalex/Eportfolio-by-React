import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import Candidate from '../../components/Candidate/Candidate';
import * as actions from '../../store/actions';
import CanInfo from '../Candidates/CanInfo/CanInfo';


class Interviews extends Component {
    showCanInfoHandler = (event, canInfo, jobState) => {
      const top = event.pageY - 200;
      this.props.showCanInfo(canInfo, top, jobState);
    };

    displayCandidates =(cans, canType) => {
      let candidateType = canType;
      return cans.map((can) => {
        if (canType === 'Recommeded') { candidateType = `Recommeded by ${can.referrer}`; }
        return (
          <Candidate
            key={uuid.v4()}
            canInfo={can}
            image="/images/profileImg1.jpg"
            canType={candidateType}
            click={this.showCanInfoHandler}
          />
        );
      });
    };

    render() {
      const fistInterviewCans = this.displayCandidates(this.props.canData['First interview'], 'First interview');
      const secondInterviewCans = this.displayCandidates(this.props.canData['2nd interview'], '2nd interview');
      return (
        <div>
          <CanInfo />
          {fistInterviewCans}
          {secondInterviewCans}
        </div>

      );
    }
}

const mapStateToProps = state => ({
  canData: state.employer.canData,
  hasErrored: state.employer.hasErrored,
  isLoading: state.employer.isLoading,
});

const mapDispatchToProps = dispatch => ({
  showCanInfo: (canInfo, top, jobState) => dispatch(actions.showCanInfo(canInfo, top, jobState)),
});

Interviews.propTypes = {
  canData: PropTypes.objectOf(PropTypes.Object),
  showCanInfo: PropTypes.func,
};

Interviews.defaultProps = {
  canData: {},
  showCanInfo: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Interviews);
