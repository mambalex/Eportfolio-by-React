import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../Portfolio/Portfolio.css';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import { changeCSSPercent } from '../../../utility/utility';
import * as actions from '../../../store/actions';


class Home extends Component {
    updateHandler =() => {
      const allContact = {};
      const experienceList = [...this.props.experienceList];
      const allExp = [];
      const educationList = [...this.props.educationList];
      const allEdu = [];
      const projectList = [...this.props.projectList];
      const allProj = [];
      const skillList = { ...this.props.skillList };
      const allSkill = {};
      const courseList = [...this.props.courseList];
      const allCourse = [];
      courseList.forEach((cour) => {
        allCourse.push({ [cour.code]: cour.name });
      });
      experienceList.forEach((exp) => {
        const experience = {
          date: exp.description.split('\n')[0],
          text: exp.description.split('\n')[1],
          title: exp.name,
          uuid: 'none',
        };
        const temp = exp.working_exp_uuid.slice(0, 3);
        if (temp !== 'new') {
          experience.uuid = exp.working_exp_uuid;
        }
        allExp.push(experience);
      });
      educationList.forEach((edu) => {
        const education = {};
        education.title = edu.university;
        education.date = edu.time_during;
        education.degree = edu.degree;
        education.major = edu.major;
        education.uuid = edu.education_exp_uuid;
        const temp = edu.education_exp_uuid.slice(0, 3);
        if (temp === 'new') {
          education.uuid = 'none';
        }
        allEdu.push(education);
      });
      projectList.forEach((proj) => {
        const project = {};
        project.title = proj.name;
        project.description = proj.description;
        project.link = proj.link;
        project.techs = proj.techs;
        project.uuid = 'none';
        const temp = proj.working_exp_uuid.slice(0, 3);
        if (temp !== 'new') {
          project.uuid = proj.working_exp_uuid;
        }
        allProj.push(project);
      });
      Object.keys(skillList).forEach((skill) => {
        allSkill[skill] = skillList[skill].toString();
      });

      allContact.email = this.props.personalInfo.email;
      allContact.phone = this.props.personalInfo.phone;
      allContact.github = this.props.personalInfo.link;

      const allData = {
        aboutMe: this.props.aboutMe,
        allPersonalSkills: this.props.personalSkilList,
        allSkills: allSkill,
        allCourses: allCourse,
        allEducation: allEdu,
        allProjects: allProj,
        allExperiences: allExp,
        allContact,
      };
      this.props.updateAllInfo(allData);
    }


    render() {
      const skills = Object.keys(this.props.skillList).map((skill, index) => {
        changeCSSPercent(`skill-${index + 1}`, `${this.props.skillList[skill]}%`);
        return (
          <li key={uuid.v4()}>
            <div>{skill}</div>
            <div className="percentage">
              <div className="left" />
              <div className="perct">
                {this.props.skillList[skill]}
%
              </div>
            </div>
          </li>
        );
      });
      const projects = this.props.projectList.map(proj => (
        <li key={uuid.v4()}>
          <div>{proj.name}</div>
        </li>
      ));
      const experiences = this.props.experienceList.map((exp) => {
        const date = exp.description.split('\n')[0];
        const description = exp.description.split('\n')[1];
        return (
          <li className="experience" key={uuid.v4()}>
            <input className="title" placeholder="title" value={exp.name} onChange={event => this.props.changeExperience(event.target.value, 'name', exp.working_exp_uuid)} />
            <input className="date" placeholder="date" value={date} onChange={event => this.props.changeExperience(event.target.value, 'date', exp.working_exp_uuid)} />
            <div className="text">
              <textarea
                placeholder="description"
                className="job-descr-input"
                rows="7"
                cols="33"
                value={description}
                onChange={event => this.props.changeExperience(event.target.value, 'description', exp.working_exp_uuid)}
              />
            </div>
            <div className="experience-delete"><i role="presentation" className="fas fa-trash-alt" onClick={() => this.props.deleteExperience(exp.working_exp_uuid)} /></div>
          </li>
        );
      });

      const educations = this.props.educationList.map(edu => (
        <li className="edu" key={uuid.v4()}>
          <input
            className="title"
            placeholder="Uni"
            value={edu.university}
            onChange={e => this.props.changeEducation(e.target.value, 'university', edu.education_exp_uuid)}
          />
          <input
            className="date"
            placeholder="date"
            value={edu.time_during}
            onChange={e => this.props.changeEducation(e.target.value, 'time_during', edu.education_exp_uuid)}
          />
          <div className="degree">
                        -
            {' '}
            <input
              className="dgr"
              placeholder="degree"
              value={edu.degree}
              onChange={e => this.props.changeEducation(e.target.value, 'degree', edu.education_exp_uuid)}
            />
            {' '}
of
            <input
              className="major"
              placeholder="major"
              value={edu.major}
              onChange={e => this.props.changeEducation(e.target.value, 'major', edu.education_exp_uuid)}
            />
          </div>
          <div className="education-delete"><i role="presentation" className="fas fa-trash-alt" onClick={() => this.props.deleteEducation(edu.education_exp_uuid)} /></div>
        </li>
      ));

      const personalSkills = this.props.personalSkilList.map((skill, index) => (
        <li className="ps" key={uuid.v4()}>
          <input
            className="personalSkill"
            placeholder="Personal Skill"
            value={skill}
            onChange={e => this.props.changePS(e.target.value, index)}
          />
          <div className="ps-delete"><i role="presentation" className="fas fa-trash-alt" onClick={() => this.props.deletePS(index)} /></div>
        </li>
      ));

      return (
        <div className="Portfolio">
          {this.props.allData ? null : <Redirect to="/candidate" />}
          <div className="top">
            <div className="name">{this.props.personalInfo.name}</div>
            <div className="top-contact">

              <div className="bottom">
                <div className="contact-l">
                  <div className="contact-icon"><i className="far fa-envelope" /></div>
                  <div className="text">Email:</div>
                  <div className="email">{this.props.personalInfo.email}</div>
                </div>
                <div className="contact-l">
                  <div className="contact-icon"><i className="fas fa-phone" /></div>
                  <div className="text">Phone:</div>
                  <div className="phone">{this.props.personalInfo.phone}</div>
                </div>
                <div className="contact-l">
                  <div className="contact-icon"><i className="fab fa-github" /></div>
                  <div className="text">Github:</div>
                  <div className="github">{this.props.personalInfo.link}</div>
                </div>
              </div>
            </div>
            <img src="" alt="user portrait" />
          </div>
          <div className="bottom">
            <div className="about-me">
              <button type="button" className="btn btn-success update" onClick={this.updateHandler}>Update</button>
              <div className="line-text">
                <div className="text">About Me</div>
                <div className="line" />
              </div>
              <div className="profile edit">
                <textarea
                  className="about-me-input"
                  rows="7"
                  cols="33"
                  value={this.props.aboutMe}
                  onChange={e => this.props.changeAboutMe(e.target.value)}
                />
              </div>
            </div>
            <div className="home-tech-skills">
              <div className="line-text">
                <div className="text">Technical Skills</div>
                <div className="line" />
              </div>
              <div className="skill-lists">
                <ul>
                  {skills}
                </ul>
              </div>


            </div>
            <div className="home-projects">
              <div className="line-text">
                <div className="text">Projects</div>
                <div className="line" />
              </div>
              <div className="bottom">
                <ul className="home-projects-name">
                  {projects}
                </ul>
              </div>
            </div>
            <div className="home-experience">
              <div className="line-text">
                <div className="text">Experience</div>
                <div className="line" />
              </div>
              <ul className="all-experience">
                {experiences}
              </ul>
              <div className="experience-add"><i role="presentation" className="fas fa-plus" onClick={this.props.addExperience} /></div>
            </div>
            <div className="home-education">
              <div className="line-text">
                <div className="text">Education</div>
                <div className="line" />
              </div>
              <ul className="all-edu">
                {educations}
              </ul>
              <div className="experience-add"><i role="presentation" className="fas fa-plus" onClick={this.props.addEducation} /></div>
            </div>
            <div className="personal-skill">
              <div className="line-text">
                <div className="text">Personal Skills</div>
                <div className="line" />
              </div>
              <ul>
                {personalSkills}
              </ul>
              <div className="experience-add"><i role="presentation" className="fas fa-plus" onClick={this.props.addPS} /></div>
            </div>
          </div>
        </div>
      );
    }
}

const mapStateToProps = state => ({
  allData: state.candidate.allData,
  aboutMe: state.candidate.aboutMe,
  personalInfo: state.candidate.personalInfo,
  skillList: state.candidate.skillList,
  courseList: state.candidate.courseList,
  educationList: state.candidate.educationList,
  projectList: state.candidate.projectList,
  experienceList: state.candidate.experienceList,
  personalSkilList: state.candidate.personalSkilList,
});

const mapDispatchToProps = dispatch => ({
  changeAboutMe: aboutMe => dispatch(actions.changeAboutMe(aboutMe)),
  changeExperience: (value, type, expId) => dispatch(actions.changeExperience(value, type, expId)),
  addExperience: () => dispatch(actions.addExperience()),
  deleteExperience: expId => dispatch(actions.deleteExperience(expId)),
  changeEducation: (value, type, eduId) => dispatch(actions.changeEducation(value, type, eduId)),
  addEducation: () => dispatch(actions.addEducation()),
  deleteEducation: eduId => dispatch(actions.deleteEducation(eduId)),
  changePS: (value, index) => dispatch(actions.changePS(value, index)),
  addPS: () => dispatch(actions.addPS()),
  deletePS: index => dispatch(actions.deletePS(index)),
  updateAllInfo: allData => dispatch(actions.updateAllInfo(allData)),
});

Home.propTypes = {
  allData: PropTypes.objectOf(PropTypes.Object),
  aboutMe: PropTypes.string,
  personalInfo: PropTypes.objectOf(PropTypes.Object),
  skillList: PropTypes.objectOf(PropTypes.Object),
  courseList: PropTypes.instanceOf(Array),
  educationList: PropTypes.instanceOf(Array),
  projectList: PropTypes.instanceOf(Array),
  experienceList: PropTypes.instanceOf(Array),
  personalSkilList: PropTypes.instanceOf(Array),
  changeAboutMe: PropTypes.func,
  changeExperience: PropTypes.func,
  addExperience: PropTypes.func,
  deleteExperience: PropTypes.func,
  changeEducation: PropTypes.func,
  addEducation: PropTypes.func,
  deleteEducation: PropTypes.func,
  changePS: PropTypes.func,
  addPS: PropTypes.func,
  deletePS: PropTypes.func,
  updateAllInfo: PropTypes.func,
};

Home.defaultProps = {
  allData: {},
  aboutMe: '',
  personalInfo: {},
  skillList: {},
  courseList: [],
  educationList: [],
  projectList: [],
  experienceList: [],
  personalSkilList: [],
  changeAboutMe: () => {},
  changeExperience: () => {},
  addExperience: () => {},
  deleteExperience: () => {},
  changeEducation: () => {},
  addEducation: () => {},
  deleteEducation: () => {},
  changePS: () => {},
  addPS: () => {},
  deletePS: () => {},
  updateAllInfo: () => {},

};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
