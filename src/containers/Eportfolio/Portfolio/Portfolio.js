import React, {Component} from 'react';
import { connect } from 'react-redux';
import './Portfolio.css';
import {changeCSSPercent} from '../../../utility/utility';
import * as actions from "../../../store/actions";


class Portfolio extends Component {
    render() {
        const skills= Object.keys(this.props.skillList).map((skill,index)=>{
            changeCSSPercent(`skill-${index+1}`,`${this.props.skillList[skill]}%`);
            return(
                      <li key={index}>
                          <a >{skill}</a>
                          <div className="percentage"><div className="left"></div>
                          <div className="perct">{this.props.skillList[skill]}%</div>
                          </div>
                      </li>
            )
        });
        const projects= this.props.projectList.map((proj,index)=>{
            return(
                <li key={index}>
                    <div>{proj.name}</div>
                </li>
            )
        });
        const experiences= this.props.experienceList.map((exp,index)=>{
            let date = exp['description'].split("\n")[0];
            let description = exp['description'].split("\n")[1];
            return(
                <li className="experience" key={index}>
                    <div className="title" data-placeholder='Please enter a title'>{exp.name}</div>
                    <div className="date" data-placeholder='Please enter a date'>{date}</div>
                    <div className="text">
                        <p>{description}</p>
                    </div>
                </li>
            )
        });

        const educations= this.props.educationList.map((edu,index)=>{
            return(
                <li className="edu" key={index}>
                    <div className="title">{edu['university']}</div>
                    <div className="date">{edu['time_during']}</div>
                    <div className="degree">- {edu['degree']} of {edu['major']}</div>
                </li>
            )
        });

        const personalSkills= this.props.personalSkilList.map((skill,index)=>{
            return(
                <li className="ps" key={index}>
                    <span>{skill}</span>
                </li>
            )
        });

        return (
            <div className="Portfolio">
                <div className="top">
                    <div className="name">{this.props.personalInfo.name}</div>
                    <div className="top-contact">

                        <div className="bottom">
                            <div className="contact-l">
                                <div className="contact-icon"><i className="far fa-envelope"></i></div>
                                <div className="text">Email:</div>
                                <div className="email">{this.props.personalInfo.email}</div>
                            </div>
                            <div className="contact-l">
                                <div className="contact-icon"><i className="fas fa-phone"></i></div>
                                <div className="text">Phone:</div>
                                <div className="phone">{this.props.personalInfo.phone}</div>
                            </div>
                            <div className="contact-l">
                                <div className="contact-icon"><i className="fab fa-github"></i></div>
                                <div className="text">Github:</div>
                                <div className="github">{this.props.personalInfo.link}</div>
                            </div>
                        </div>
                    </div>
                    <img src="/images/profileImg1.jpg" alt="user portrait" />
                </div>
                <div className="bottom">
                    <div className="about-me">
                        <div className="line-text">
                            <div className="text">About Me</div>
                            <div className="line"></div>
                        </div>
                        <div className="profile edit">
                            <p>{this.props.aboutMe}</p>
                        </div>
                    </div>
                    <div className="home-tech-skills">
                        <div className="line-text">
                            <div className="text">Technical Skills</div>
                            <div className="line"></div>
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
                            <div className="line"></div>
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
                            <div className="line"></div>
                        </div>
                        <ul className="all-experience">
                            {experiences}
                        </ul>

                    </div>
                    <div className="home-education">
                        <div className="line-text">
                            <div className="text">Education</div>
                            <div className="line"></div>
                        </div>
                        <ul className="all-edu">
                            {educations}
                        </ul>
                    </div>
                    <div className="personal-skill">
                        <div className="line-text">
                            <div className="text">Personal Skills</div>
                            <div className="line"></div>
                        </div>
                        <ul>
                            {personalSkills}
                        </ul>
                    </div>
                    </div>
                </div>
        );
    }

}

const mapStateToProps = state => {
    return{
        candidateDate: state.candidate.allData,
        aboutMe : state.candidate.allData['about_me'],
        personalInfo : state.candidate.allData['personal_info'],
        skillList : state.candidate.allData['skill_set'],
        courseList : state.candidate.allData['course_list'],
        educationList : state.candidate.allData['education_exp'],
        projectList : state.candidate.allData['project_list'],
        experienceList : state.candidate.allData['experiences'],
        personalSkilList : state.candidate.allData['personal_skill']
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        fetchCandidateData: () => dispatch(actions.fetchCandidateData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);