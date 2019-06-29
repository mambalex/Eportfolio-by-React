import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Candidates.module.css';
import uuid from 'uuid';
import Candidate from '../../components/Candidate/Candidate';
import CanInfo from './CanInfo/CanInfo';
import * as actions from '../../store/actions';


export class Candidates extends Component {
    showCanInfoHandler = (event, canInfo, jobState) => {
      const top = event.pageY - 200;
      if (this.props.role === 'employer') {
        this.props.showCanInfo(canInfo, top, jobState);
      } else {
        this.props.showCanInfoInstructor(canInfo, top, jobState);
      }
    }


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
    }

    render() {
      if (this.props.role === 'employer') {
        if (this.props.isLoading) { return <p>Loading candidate data...</p>; }
        if (this.props.hasError) { return <p>Sorry! There was an error loading the data</p>; }
        if (this.props.canData) {
          const savedCandidates = this.displayCandidates(this.props.canData['Saved candidate'], 'Saved candidate');
          const testCans = this.displayCandidates(this.props.canData.Test, 'Test');
          const gotOfferCans = this.displayCandidates(this.props.canData['Got offer'], 'Got offer');
          const engagedCans = this.displayCandidates(this.props.canData.Engaged, 'Engaged');
          return (
            <div>
              <CanInfo />
              {savedCandidates}
              {testCans}
              {gotOfferCans}
              {engagedCans}
            </div>
          );
        }
      }
      if (this.props.role === 'instructor') {
        if (this.props.instructorLoading) {
          return <p>Loading candidate data...</p>;
        }
        if (this.props.instructorError) {
          return <p>Sorry! There was an error loading the data</p>;
        }
        if (this.props.instructorCanData) {
          const savedCans = this.displayCandidates(this.props.instructorCanData.saved_user_list, 'Saved candidate');
          return (
            <div>
              <CanInfo />
              {savedCans}
            </div>
          );
        }
      }
      return null;
    }
}

const mapStateToProps = state => ({
  role: state.auth.role,
  canData: state.employer.canData,
  hasError: state.employer.hasErrored,
  isLoading: state.employer.isLoading,
  instructorCanData: state.instructor.allData,
  instructorError: state.instructor.hasErrored,
  instructorLoading: state.instructor.isLoading,
});

const mapDispatchToProps = dispatch => ({
  showCanInfo: (canInfo, top, jobState) => dispatch(actions.showCanInfo(canInfo, top, jobState)),
  showCanInfoInstructor: (canInfo, top, jobState) => dispatch(
    actions.showCanInfoInstructor(canInfo, top, jobState),
  ),
});

Candidates.propTypes = {
  role: PropTypes.string,
  canData: PropTypes.objectOf(PropTypes.object),
  hasError: PropTypes.bool,
  isLoading: PropTypes.bool,
  instructorCanData: PropTypes.objectOf(PropTypes.object),
  instructorError: PropTypes.bool,
  instructorLoading: PropTypes.bool,
  showCanInfo: PropTypes.func,
  showCanInfoInstructor: PropTypes.func,
};

Candidates.defaultProps = {
  role: '',
  canData: {},
  hasError: 'false',
  isLoading: 'false',
  instructorCanData: {},
  instructorError: 'false',
  instructorLoading: 'false',
  showCanInfo: () => {},
  showCanInfoInstructor: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Candidates);
