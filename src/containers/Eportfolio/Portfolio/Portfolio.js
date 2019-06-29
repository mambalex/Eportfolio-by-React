import React from 'react';
import { connect } from 'react-redux';
import './Portfolio.css';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import { changeCSSPercent } from '../../../utility/utility';
import * as actions from '../../../store/actions';


const Portfolio = (props) => {
  const skills = Object.keys(props.skillList).map((skill, index) => {
    changeCSSPercent(`skill-${index + 1}`, `${props.skillList[skill]}%`);
    return (
      <li key={uuid.v4()}>
        <div>{skill}</div>
        <div className="percentage">
          <div className="left" />
          <div className="perct">
            {props.skillList[skill]}
%
          </div>
        </div>
      </li>
    );
  });
  const projects = props.projectList.map(proj => (
    <li key={uuid.v4()}>
      <div>{proj.name}</div>
    </li>
  ));
  const experiences = props.experienceList.map((exp) => {
    const date = exp.description.split('\n')[0];
    const description = exp.description.split('\n')[1];
    return (
      <li className="experience" key={uuid.v4()}>
        <div className="title" data-placeholder="Please enter a title">{exp.name}</div>
        <div className="date" data-placeholder="Please enter a date">{date}</div>
        <div className="text">
          <p>{description}</p>
        </div>
      </li>
    );
  });

  const educations = props.educationList.map(edu => (
    <li className="edu" key={uuid.v4()}>
      <div className="title">{edu.university}</div>
      <div className="date">{edu.time_during}</div>
      <div className="degree">
-
        {edu.degree}
        {' '}
of
        {edu.major}
      </div>
    </li>
  ));

  const personalSkills = props.personalSkilList.map(skill => (
    <li className="ps" key={uuid.v4()}>
      <span>{skill}</span>
    </li>
  ));

  return (
    <div className="Portfolio">
      <div className="top">
        <div className="name">{props.personalInfo.name}</div>
        <div className="top-contact">

          <div className="bottom">
            <div className="contact-l">
              <div className="contact-icon"><i className="far fa-envelope" /></div>
              <div className="text">Email:</div>
              <div className="email">{props.personalInfo.email}</div>
            </div>
            <div className="contact-l">
              <div className="contact-icon"><i className="fas fa-phone" /></div>
              <div className="text">Phone:</div>
              <div className="phone">{props.personalInfo.phone}</div>
            </div>
            <div className="contact-l">
              <div className="contact-icon"><i className="fab fa-github" /></div>
              <div className="text">Github:</div>
              <div className="github">{props.personalInfo.link}</div>
            </div>
          </div>
        </div>
        <img src="/images/profileImg1.jpg" alt="user portrait" />
      </div>
      <div className="bottom">
        <div className="about-me">
          <div className="line-text">
            <div className="text">About Me</div>
            <div className="line" />
          </div>
          <div className="profile edit">
            <p>{props.aboutMe}</p>
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

        </div>
        <div className="home-education">
          <div className="line-text">
            <div className="text">Education</div>
            <div className="line" />
          </div>
          <ul className="all-edu">
            {educations}
          </ul>
        </div>
        <div className="personal-skill">
          <div className="line-text">
            <div className="text">Personal Skills</div>
            <div className="line" />
          </div>
          <ul>
            {personalSkills}
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  aboutMe: state.candidate.allData.about_me,
  personalInfo: state.candidate.allData.personal_info,
  skillList: state.candidate.allData.skill_set,
  educationList: state.candidate.allData.education_exp,
  projectList: state.candidate.allData.project_list,
  experienceList: state.candidate.allData.experiences,
  personalSkilList: state.candidate.allData.personal_skill,
});

const mapDispatchToProps = dispatch => ({
  fetchCandidateData: () => dispatch(actions.fetchCandidateData()),
});


Portfolio.propTypes = {
  aboutMe: PropTypes.string,
  personalInfo: PropTypes.objectOf(PropTypes.Object),
  skillList: PropTypes.objectOf(PropTypes.Object),
  educationList: PropTypes.instanceOf(Array),
  projectList: PropTypes.instanceOf(Array),
  experienceList: PropTypes.instanceOf(Array),
  personalSkilList: PropTypes.instanceOf(Array),
};

Portfolio.defaultProps = {
  aboutMe: '',
  personalInfo: {},
  skillList: {},
  educationList: [],
  projectList: [],
  experienceList: [],
  personalSkilList: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
