import React, { Component } from 'react';
import { connect } from 'react-redux';
import './NewConnection.css';
import onClickOutside from 'react-onclickoutside';
import axios from 'axios';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import * as actions from '../../../store/actions/index';


class NewConnection extends Component {
    state={
      jobId: this.props.firstJobId,
      canId: this.props.firstCanId,
    };

    myClickOutsideHandler = () => {
      this.props.cancelNewCon();
    };

    makeConnection=() => {
      const formData = new FormData();
      formData.append('job_info_id', this.state.jobId);
      formData.append('student_id', this.state.canId);
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Basic ${btoa(`${localStorage.getItem('token')}:`)}`,
        },
      };
      axios.post('http://localhost:5000/api/set_recommendation_for_job', formData, config)
        .then(() => {
          // eslint-disable-next-line no-alert
          alert('Successfully recommended!');
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
          // dispatch(authFail(err.response.data.error));
        });
    };

    onchange=(e, type) => {
      this.setState({ [type]: e.target.value });
    };

    render() {
      if (!this.props.newCon) { return (null); }
      const cans = this.props.canList.map(can => (
        <option value={can.username} key={uuid.v4()}>{can.name}</option>
      ));
      const jobs = this.props.jobList.map(job => (
        <option value={job.job_info_id} key={uuid.v4()}>{job.job_name}</option>
      ));
      return (
        <div className="make-connections">
          <div className="target-boxes">
            <div className="target-job boxes">
              <div className="title">Target Job</div>
              <div className="box job-drop-box">
                <select onChange={e => this.onchange(e, 'jobId')}>
                  {jobs}
                </select>
              </div>
            </div>
            <div className="arrow"><i className="fas fa-exchange-alt" /></div>
            <div className="target-candidate boxes">
              <div className="title">Target Candidate</div>
              <div className="box candidate-drop-box">
                <select onChange={e => this.onchange(e, 'canId')}>
                  {cans}
                </select>
              </div>
            </div>
          </div>
          <div className="recommend">
            <button type="button" className="recommend-btn" onClick={this.makeConnection}>Recommend</button>
          </div>
        </div>
      );
    }
}

const mapStateToProps = (state) => {
  let firstjob = '';
  let firstcan = '';
  if (state.instructor.allData.saved_job_list.length > 0) {
    firstjob = state.instructor.allData.saved_job_list[0].job_info_id;
  }
  if (state.instructor.allData.saved_user_list.length > 0) {
    firstcan = state.instructor.allData.saved_user_list[0].username;
  }
  return {
    newCon: state.instructor.newCon,
    jobList: state.instructor.allData.saved_job_list,
    canList: state.instructor.allData.saved_user_list,
    firstJobId: firstjob,
    firstCanId: firstcan,

  };
};

const mapDispatchToProps = dispatch => ({
  cancelNewCon: () => dispatch(actions.cancelNewCon()),
});

const clickOutsideConfig = {
  handleClickOutside(instance) {
    return instance.myClickOutsideHandler;
  },
};


NewConnection.propTypes = {
  newCon: PropTypes.bool,
  jobList: PropTypes.instanceOf(Array),
  canList: PropTypes.instanceOf(Array),
  firstJobId: PropTypes.string,
  firstCanId: PropTypes.string,
  cancelNewCon: PropTypes.func,
};

NewConnection.defaultProps = {
  newCon: false,
  jobList: [],
  canList: [],
  firstJobId: '',
  firstCanId: '',
  cancelNewCon: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(onClickOutside(
  NewConnection, clickOutsideConfig,
));
