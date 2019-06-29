import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SkillSet.css';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import * as actions from '../../../store/actions';


class SkillSet extends Component {
    state={
      skill: '',
      percent: '',
      courseCode: '',
      courseName: '',
    };

    addSkillHandler = (skill, percent) => {
      this.props.addSkill(skill, percent);
      this.setState({ skill: '', percent: '' });
    };

    changeHandler = (event, type) => {
      this.setState({ [type]: event.target.value });
    };

    addCourseHandler = (code, name) => {
      this.props.addCourse(code, name);
      this.setState({ courseCode: '', courseName: '' });
    };

    render() {
      const skills = Object.keys(this.props.skillList).map(skill => (
        <li className="text" key={uuid.v4()}>
          <div className="text">{skill}</div>
          <div className="percent">
            {this.props.skillList[skill]}
%
          </div>
          <i role="presentation" className="far fa-trash-alt " onClick={() => this.props.deleteSkillHandler(skill)} />
        </li>
      ));
      const courses = this.props.courseList.map(cour => (
        <li className="course" key={uuid.v4()}>
          <div className="wrapper">
            <div className="course-title">{cour.code}</div>
            <div className="text">
-
              {cour.name}
            </div>
            <i role="presentation" className="far fa-trash-alt " onClick={() => this.props.deleteCourseHandler(cour.code)} />
          </div>
        </li>
      ));
      return (
        <div className="skill-set">
          <div className="title"><h2>Skill Set</h2></div>
          <div className="bottom">
            <div className="skills">
              <ul className="skill-list">
                {skills}
              </ul>
            </div>
            <div className="skill-form">
              <input
                id="skillEnter"
                name="skill"
                className="input form-control"
                placeholder="Enter skill here"
                value={this.state.skill}
                onChange={e => this.changeHandler(e, 'skill')}
              />
              <input
                type="number"
                max="100"
                id="percentage"
                className="form-control"
                placeholder="Enter percentage here"
                value={this.state.percent}
                onChange={e => this.changeHandler(e, 'percent')}
              />
              <button type="button" className="add" onClick={() => this.addSkillHandler(this.state.skill, this.state.percent)}>Add</button>
            </div>
          </div>
          <div className="title"><h2>Courses</h2></div>
          <div className="courses-wrapper">
            <ul className="courses">
              {courses}
            </ul>
            <div className="skill-form">
              <input
                id="skillEnter"
                name="skill"
                className="input form-control"
                placeholder="Course code"
                value={this.state.courseCode}
                onChange={e => this.changeHandler(e, 'courseCode')}
              />
              <input
                id="percentage"
                className="form-control"
                placeholder="Course name"
                value={this.state.courseName}
                onChange={e => this.changeHandler(e, 'courseName')}
              />
              <button type="button" className="add" onClick={() => this.addCourseHandler(this.state.courseCode, this.state.courseName)}>Add</button>
            </div>
          </div>
        </div>
      );
    }
}

const mapStateToProps = state => ({
  skillList: state.candidate.skillList,
  courseList: state.candidate.courseList,
});

const mapDispatchToProps = dispatch => ({
  addSkill: (skill, percent) => dispatch(actions.addSkill(skill, percent)),
  deleteSkillHandler: skill => dispatch(actions.deleteSkill(skill)),
  addCourse: (courseCode, courseName) => dispatch(actions.addCourse(courseCode, courseName)),
  deleteCourseHandler: code => dispatch(actions.deleteCourse(code)),
});

SkillSet.propTypes = {
  skillList: PropTypes.instanceOf(Array),
  courseList: PropTypes.instanceOf(Array),
  addSkill: PropTypes.func,
  deleteSkillHandler: PropTypes.func,
  addCourse: PropTypes.func,
  deleteCourseHandler: PropTypes.func,
};

SkillSet.defaultProps = {
  skillList: [],
  courseList: [],
  addSkill: () => {},
  deleteSkillHandler: () => {},
  addCourse: () => {},
  deleteCourseHandler: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(SkillSet);
