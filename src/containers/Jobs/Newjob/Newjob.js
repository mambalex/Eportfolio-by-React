import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Newjob.css';
import onClickOutside from 'react-onclickoutside';
import axios from 'axios';
import PropTypes from 'prop-types';
import * as actions from '../../../store/actions/index';


const placeHolder = {
  responsibilities: 'Responsibility',
  ITSkill: 'IT skill',
  personalStrengths: 'Personal Strength',
  others: 'Other',
};

class Newjob extends Component {
        state={
          title: '',
          salary: '',
          location: '',
          company: '',
          workType: '',
          jobSummary: '',
          responsibilities: [],
          ITSkill: [],
          personalStrengths: [],
          others: [],
        }

        myClickOutsideHandler = () => {
          this.props.cancelNewJob();
        }


        changeHandeler = (event, type, index) => {
          const newState = { ...this.state };
          if (type === 'responsibilities' || type === 'ITSkill' || type === 'personalStrengths' || type === 'others') {
            newState[type][index] = event.target.value;
          } else {
            newState[type] = event.target.value;
          }
          this.setState(newState);
        }

        addLiHandeler = (event, type) => {
          // eslint-disable-next-line react/no-access-state-in-setstate
          this.setState({ [type]: this.state[type].concat(['']) });
        }

        removeLiHandeler = (event, type, index) => {
          // eslint-disable-next-line react/no-access-state-in-setstate
          const newArray = [...this.state[type]];
          newArray.splice(index, 1);
          this.setState({ [type]: newArray });
        }

        displayList = (listName) => {
          if (this.state[listName].length > 1) {
            const lis = this.state[listName].slice(1).map((val, index) => {
            // eslint-disable-next-line no-param-reassign,no-plusplus
              index++;
              const clsname = `add-${listName}`;
              return (
              // eslint-disable-next-line react/no-array-index-key
                <li key={index}>
                  <input
                    type=""
                    className={clsname}
                    placeholder={placeHolder[listName]}
                    value={val}
                    onChange={event => this.changeHandeler(event, listName, index)}
                  />
                  <i role="presentation" className="material-icons remove" onClick={event => this.removeLiHandeler(event, listName, index)}>remove_circle_outline</i>
                </li>
              );
            });
            return lis;
          }
          return null;
        }


        createNewJobHandler = () => {
          const url = 'http://localhost:5000/api/create_job_info';
          const data = { create_job: this.state };
          const config = {
            headers: {
              'Access-Control-Allow-Origin': '*',
              Authorization: `Basic ${btoa(`${localStorage.getItem('token')}:`)}`,
            },
          };
          axios.post(url, data, config)
            .then(() => {
              this.setState({
                title: '',
                salary: '',
                location: '',
                company: '',
                workType: '',
                jobSummary: '',
                responsibilities: [],
                ITSkill: [],
                personalStrengths: [],
                others: [],
              });
              this.myClickOutsideHandler();
              this.props.fetchEmployerData();
            })
            // eslint-disable-next-line no-console
            .catch(err => console.log(err));
        };

        render() {
          if (!this.props.newJob) { return (null); }
          const respnList = this.displayList('responsibilities');
          const itSillList = this.displayList('ITSkill');
          const psList = this.displayList('personalStrengths');
          const otherList = this.displayList('others');
          return (
            <div className="new-opening-job ">
              <div className="title">
                <div className="job-title">
                  <input type="text" placeholder="Job title" value={this.state.title} onChange={event => this.changeHandeler(event, 'title')} />
                </div>
                {/* <i className="fas fa-backspace job-creation-close"></i> */}
                <div
                  id="successAlert"
                  className="alert alert-success longin-alert"
                  role="alert"
                  style={{ display: 'none' }}
                />
                <div
                  id="errorAlert"
                  className="alert alert-danger longin-alert"
                  role="alert"
                  style={{ display: 'none' }}
                />
              </div>

              <div className="salary-location">
                <div className="salary list">
                  <i className="flaticon-money" />
                  <span className="left">Salary:</span>
                  <input
                    type="text"
                    name="add-salary"
                    placeholder="salary"
                    value={this.state.salary}
                    onChange={event => this.changeHandeler(event, 'salary')}
                  />
                </div>
                <div className="location list">
                  <i className="flaticon-pin" />
                  <span className="left">Location:</span>
                  <input
                    type="text"
                    name="add-location"
                    placeholder="location"
                    value={this.state.location}
                    onChange={event => this.changeHandeler(event, 'location')}
                  />
                </div>
                <div className="company list">
                  <i className="flaticon-branch" />
                  <span className="left">Company:</span>
                  <input
                    type="text"
                    name="add-company"
                    placeholder="Company"
                    value={this.props.username}
                  />
                </div>
                <div className="work-type list">
                  <i className="flaticon-bag" />
                  <span className="left">Work Type:</span>
                  <input
                    type="text"
                    name="add-work-type"
                    placeholder="Work Type"
                    value={this.state.workType}
                    onChange={event => this.changeHandeler(event, 'workType')}
                  />
                </div>
                <div className="create-job">
                  <button type="button" onClick={this.createNewJobHandler}>Create a Job</button>
                </div>
              </div>
              <div className="job-summary">Job Summary:</div>
              <div className="description">
                <textarea
                  name="textarea"
                  className="add-job-summary"
                  placeholder="Job Summary"
                  value={this.state.jobSummary}
                  onChange={event => this.changeHandeler(event, 'jobSummary')}
                />
              </div>
              <div className="job-responsibilities">Responsibilities:</div>
              <div className="responsibilities">
                <ul>
                  <li>
                    <input
                      placeholder="responsibilities"
                      value={this.state.responsibilities.length > 0 ? this.state.responsibilities[0] : ''}
                      onChange={event => this.changeHandeler(event, 'responsibilities', 0)}
                    />
                    <button type="button" onClick={event => this.addLiHandeler(event, 'responsibilities')}>Add</button>
                  </li>
                  {respnList}
                </ul>

              </div>
              <div className="skills-required-title">Software and IT Skills Required:</div>
              <div className="skills-required">
                <ul>
                  <li>
                    <input
                      placeholder="IT skill"
                      value={this.state.ITSkill.length > 0 ? this.state.ITSkill[0] : ''}
                      onChange={event => this.changeHandeler(event, 'ITSkill', 0)}
                    />
                    <button type="button" onClick={event => this.addLiHandeler(event, 'ITSkill')}>Add</button>
                  </li>
                  {itSillList}
                </ul>
              </div>
              <div className="personal-skills-title">Personal Attributes and Strengths:</div>
              <div className="personal-skills">
                <ul>
                  <li>
                    <input
                      placeholder="Personal Strength"
                      value={this.state.personalStrengths.length > 0 ? this.state.personalStrengths[0] : ''}
                      onChange={event => this.changeHandeler(event, 'personalStrengths', 0)}
                    />
                    <button type="button" onClick={event => this.addLiHandeler(event, 'personalStrengths')}>Add</button>
                  </li>
                  {psList}
                </ul>
              </div>
              <div className="others-title">Others:</div>
              <div className="others">
                <ul>
                  <li>
                    <input
                      placeholder="Others"
                      value={this.state.others.length > 0 ? this.state.others[0] : ''}
                      onChange={event => this.changeHandeler(event, 'others', 0)}
                    />
                    <button type="button" onClick={event => this.addLiHandeler(event, 'others')}>Add</button>
                  </li>
                  {otherList}
                </ul>
              </div>
            </div>
          );
        }
}

const mapStateToProps = state => ({
  username: state.employer.allData.username,
  newJob: state.employer.newJob,
});

const mapDispatchToProps = dispatch => ({
  cancelNewJob: () => dispatch(actions.cancelNewJob()),
  fetchEmployerData: () => dispatch(actions.fetchEmployerData()),
});

const clickOutsideConfig = {
  handleClickOutside(instance) {
    return instance.myClickOutsideHandler;
  },
};


Newjob.propTypes = {
  username: PropTypes.string,
  newJob: PropTypes.bool,
  cancelNewJob: PropTypes.func,
  fetchEmployerData: PropTypes.func,
};

Newjob.defaultProps = {
  username: '',
  newJob: false,
  cancelNewJob: () => {},
  fetchEmployerData: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(
  onClickOutside(Newjob, clickOutsideConfig),
);
