import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PortfolioJobs.css';
import PropTypes from 'prop-types';
import * as actions from '../../../store/actions';
import JobInfo from '../../Jobs/JobInfo/JobInfo';


class PortfolioJobs extends Component {
    showJobInfoHandler = (event, job) => {
      const top = event.pageY - 80;
      const jobInfo = {
        title: job.job_name,
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
      this.props.showJobInfo(jobInfo, top);
    }

    render() {
      const saveJobs = this.props.savedJobList.map(job => (
        <li className="text">
          <span
            role="presentation"
            className="text popup"
            onClick={e => this.showJobInfoHandler(e, job)}
          >
            {job.job_name}
          </span>
          <i role="presentation" className="far fa-trash-alt " onClick={() => this.props.deleteJob(job.job_info_id)} />
        </li>
      ));
      const rcmJobs = this.props.rcmdJobList.map(job => (
        <li>
          <div
            role="presentation"
            className="job popup"
            onClick={e => this.showJobInfoHandler(e, job)}
          >
            {job.job_name}
          </div>
          <div className="referrer">
by
            <div>{job.referrer}</div>
          </div>
        </li>
      ));
      return (
        <div className="PortfolioJobs">
          <div className="jobs">
            <div className="title"><h2>Jobs</h2></div>
            <div className="middle">
              <div className="right">
                <div className="description"><p>Saved jobs:</p></div>
                <div className="list">
                  <ul className="save-jobs">
                    {saveJobs}
                  </ul>
                </div>
              </div>


            </div>
            <div className="bottom">
              <div className="description"><p>Recommended jobs:</p></div>
              <div className="list">
                <ul className="rcm">
                  {rcmJobs}
                </ul>
              </div>
            </div>
          </div>
          <JobInfo />
        </div>
      );
    }
}

const mapStateToProps = state => ({
  savedJobList: state.candidate.savedJobList,
  rcmdJobList: state.candidate.rcmdJobList,
});

const mapDispatchToProps = dispatch => ({
  showJobInfo: (jobInfo, top) => dispatch(actions.showJobInfoCandidate(jobInfo, top)),
  deleteJob: id => dispatch(actions.deleteSavedJob(id)),
});

PortfolioJobs.propTypes = {
  savedJobList: PropTypes.instanceOf(Array),
  rcmdJobList: PropTypes.instanceOf(Array),
  showJobInfo: PropTypes.func,
  deleteJob: PropTypes.func,
};

PortfolioJobs.defaultProps = {
  savedJobList: [],
  rcmdJobList: [],
  showJobInfo: () => {},
  deleteJob: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioJobs);
