import React, { Component } from 'react';
import { connect } from 'react-redux';
import './JobInfo.css';
import onClickOutside from 'react-onclickoutside';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import * as actions from '../../../store/actions/index';


class JobInfo extends Component {
    myClickOutsideHandler = () => {
      switch (this.props.role) {
        case 'employer': this.props.cancelJobInfo(); break;
        case 'instructor': this.props.cancelJobInfoInstructor(); break;
        case 'candidate': this.props.cancelJobInfoCandidate(); break;
        default: break;
      }
    }

    deleteJobHandler = (event, jobId) => {
      this.props.deleteJob(jobId);
    }

    displayList = (listName) => {
      if (this.props.jobInfo[listName].length > 0) {
        const lis = this.props.jobInfo[listName].map(val => (
          <li key={uuid.v4()}>{val}</li>
        ));
        return lis;
      }
      return null;
    }


    render() {
      if (Object.keys(this.props.jobInfo).length === 0) { return null; }
      return (
        <div className="job-popup" style={{ top: this.props.jobInfo.top }}>
          <div className="title">
            <span>
              {this.props.jobInfo.title}
            </span>
            {this.props.searchOrHome === 'Home' ? <button className="update" type="button" onClick={() => this.props.saveJob(this.props.role, this.props.jobInfo.jobId)}>Save</button> : null}
            {this.props.role === 'employer' && this.props.searchOrHome === 'Search' ? <button className="deleteBtn" type="button" onClick={event => this.deleteJobHandler(event, this.props.jobInfo.jobId)}>Delete this job</button> : null}
          </div>
          <div className="salary-location">
            <div className="salary list">
              <i className="flaticon-money" />
              <span className="left">Salary:</span>
              <span id="salary">{this.props.jobInfo.salary}</span>
              <span className="per-year">{this.props.jobInfo.salary ? 'per year' : ''}</span>
            </div>
            <div className="location list">
              <i className="flaticon-pin" />
              <span className="left">Location:</span>
              <span id="lct">{this.props.jobInfo.location}</span>
            </div>
            <div className="company list">
              <i className="flaticon-branch" />
              <span className="left">Company:</span>
              <span id="company">{this.props.jobInfo.company}</span>
            </div>
            <div className="work-type list">
              <i className="flaticon-bag" />
              <span className="left">Work Type:</span>
              <span id="work-type">{this.props.jobInfo.workType}</span>
            </div>
          </div>
          <div className="job-summary">Job Summary:</div>
          <div className="description">
            <p>{this.props.jobInfo.jobSummary}</p>
          </div>
          <div className="job-responsibilities">Responsibilities:</div>
          <div className="responsibilities">
            <ul>
              {this.displayList('responsibilities')}
            </ul>
          </div>
          <div className="skills-required-title">Software and IT Skills Required:</div>
          <div className="skills-required">
            <ul>
              {this.displayList('ITSkill')}
            </ul>
          </div>
          <div className="personal-skills-title">Personal Attributes and Strengths:</div>
          <div className="personal-skills">
            <ul>
              {this.displayList('personalStrengths')}
            </ul>
          </div>
          <div className="others-title">Others</div>
          <div className="others">
            <ul>
              {this.displayList('others')}
            </ul>
          </div>
        </div>
      );
    }
}

const mapStateToProps = (state) => {
  const { jobInfo } = state[state.auth.role];
  // const jobInfo = state[state.auth.role].jobInfo;
  // if(state.auth.role === 'employer'){
  //     jobInfo = state.employer.jobInfo;
  // }else{
  //     jobInfo = state.instructor.jobInfo;
  // }
  return {
    role: state.auth.role,
    jobInfo,
    searchOrHome: state.searchResult.searchOrHome,
  };
};

const mapDispatchToProps = dispatch => ({
  cancelJobInfo: () => dispatch(actions.cancelJobInfo()),
  cancelJobInfoInstructor: () => dispatch(actions.cancelJobInfoInstructor()),
  cancelJobInfoCandidate: () => dispatch(actions.cancelJobInfoCandidate()),
  deleteJob: jobId => dispatch(actions.deleteJob(jobId)),
  saveJob: (role, jobId) => dispatch(actions.saveJob(role, jobId)),
});

const clickOutsideConfig = {
  handleClickOutside(instance) {
    return instance.myClickOutsideHandler;
  },
};

JobInfo.propTypes = {
  role: PropTypes.string,
  jobInfo: PropTypes.objectOf(PropTypes.Object),
  searchOrHome: PropTypes.string,
  cancelJobInfo: PropTypes.func,
  cancelJobInfoInstructor: PropTypes.func,
  cancelJobInfoCandidate: PropTypes.func,
  deleteJob: PropTypes.func,
  saveJob: PropTypes.func,
};

JobInfo.defaultProps = {
  role: '',
  jobInfo: {},
  searchOrHome: '',
  cancelJobInfo: () => {},
  cancelJobInfoInstructor: () => {},
  cancelJobInfoCandidate: () => {},
  deleteJob: () => {},
  saveJob: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(
  onClickOutside(JobInfo, clickOutsideConfig),
);
