import React, { Component } from 'react';
import './SearchResult.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import * as actions from '../../../store/actions';
import JobInfo from '../../Jobs/JobInfo/JobInfo';
import CanInfo from '../../Candidates/CanInfo/CanInfo';

class SearchResult extends Component {
    canPopup=(e, canInfo) => {
      const top = e.pageY - 200;
      switch (this.props.role) {
        case 'employer': this.props.showCanInfo(canInfo, top, null); break;
        case 'instructor': this.props.showCanInfoInstructor(canInfo, top, null); break;
        case 'candidate': this.props.showCanInfoCandidate(canInfo, top, null); break;
        default: break;
      }
    }

    jobPopup=(e, jobInfo) => {
      const top = e.pageY - 300;
      switch (this.props.role) {
        case 'employer': this.props.showJobHandler(jobInfo, top); break;
        case 'instructor': this.props.showJobInstructorHandler(jobInfo, top); break;
        case 'candidate': this.props.showJobCandidateHandler(jobInfo, top); break;
        default: break;
      }
    }

    render() {
      let cans = null;
      let jobs = null;
      let num = null;
      let canOrjob = null;
      if (this.props.allCans) {
        num = this.props.allCans.length;
        canOrjob = 'Potential candidates';
        if (num === 1) { canOrjob = 'Potential candidate'; }
        cans = this.props.allCans.map(can => (
          <li className="can" key={uuid.v4()}>
            <div role="presentation" className="title" onClick={e => this.canPopup(e, can)}>{can.name}</div>
            <div className="description">{can.about_me}</div>
          </li>
        ));
      }
      if (this.props.allJobs) {
        canOrjob = 'Potential jobs';
        num = this.props.allJobs.length;
        if (num === 1) { canOrjob = 'Potential job'; }
        jobs = this.props.allJobs.map((job) => {
          const jobInfo = {
            title: job.job_title,
            salary: job.salary,
            location: job.location,
            company: job.company_name,
            workType: job.job_type,
            jobSummary: job.description,
            responsibilities: job.responsibility,
            ITSkill: job.itskill,
            personalStrengths: job.personal_strength,
            others: job.others,
            jobId: job.job_info_id,
          };
          return (
            <li className="job" key={uuid.v4()}>
              <div role="presentation" className="title" onClick={e => this.jobPopup(e, jobInfo)}>{job.job_title}</div>
              <div className="description">{job.description}</div>
            </li>
          );
        });
      }
      let left = (
        <div className="left">
          <span>
#
            {num}
          </span>
          {' '}
          <br />
          {canOrjob}
        </div>
      );
      let cla = 'right';
      if (this.props.role === 'candidate') { left = null; cla = 'right can-right'; }
      return (
        <div className="Results">
          {left}
          <div className={cla}>
            <ul className="job-list">
              {jobs}
              <JobInfo />
            </ul>
            <ul className="can-list">
              {cans}
              <CanInfo />
            </ul>
          </div>
        </div>

      );
    }
}

const mapStateToProps = state => ({
  role: state.auth.role,
  allJobs: state.searchResult.allJobs,
  allCans: state.searchResult.allCans,
});

const mapDispatchToProps = dispatch => ({
  searchCans: data => dispatch(actions.searchCans(data)),
  searchJobs: data => dispatch(actions.searchJobs(data)),
  showJobHandler: (jobInfo, top) => dispatch(actions.showJobInfo(jobInfo, top)),
  showJobInstructorHandler: (jobInfo, top) => dispatch(actions.showJobInfoInstructor(jobInfo, top)),
  showJobCandidateHandler: (jobInfo, top) => dispatch(actions.showJobInfoCandidate(jobInfo, top)),
  showCanInfo: (canInfo, top, jobState) => dispatch(actions.showCanInfo(canInfo, top, jobState)),
  showCanInfoInstructor: (canInfo, top, jobState) => dispatch(
    actions.showCanInfoInstructor(canInfo, top, jobState),
  ),
  showCanInfoCandidate: (canInfo, top, jobState) => dispatch(
    actions.showCanInfoCandidate(canInfo, top, jobState),
  ),
});

SearchResult.propTypes = {
  role: PropTypes.string,
  allJobs: PropTypes.instanceOf(Array),
  allCans: PropTypes.instanceOf(Array),
  showJobHandler: PropTypes.func,
  showJobInstructorHandler: PropTypes.func,
  showJobCandidateHandler: PropTypes.func,
  showCanInfo: PropTypes.func,
  showCanInfoInstructor: PropTypes.func,
  showCanInfoCandidate: PropTypes.func,
};

SearchResult.defaultProps = {
  role: '',
  allJobs: [],
  allCans: [],
  showJobHandler: () => {},
  showJobInstructorHandler: () => {},
  showJobCandidateHandler: () => {},
  showCanInfo: () => {},
  showCanInfoInstructor: () => {},
  showCanInfoCandidate: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
