import React, {Component} from 'react';
import { connect } from 'react-redux';
import './CanInfo.css';
import * as actions from "../../../store/actions";
import onClickOutside from "react-onclickoutside";
import {changeCSSPercent} from '../../../utility/utility';


const nextJobState ={
    'Saved candidate' : ['First interview', 'Schedule an Interview', '53e3baf0-cdd3-11e8-b600-4c3275989ef5'],
    'First interview': ['Test', 'Schedule a Test', "7413af9c-cdd3-11e8-b71a-4c3275989ef5"],
    'Test': ['2nd interview', 'Schedule 2nd Interview',"827f3f10-cdd3-11e8-a548-4c3275989ef5"],
    '2nd interview': ['Got offer', 'Provide an Offer', "2d4cbd28-cdd4-11e8-a778-4c3275989ef5"]
}

class CanInfo extends Component{

    state = {
        selectedJob:  this.props.firstJob
    }

    myClickOutsideHandler = () => {
        switch (this.props.role) {
            case 'employer':this.props.cancelCanInfo();break;
            case 'instructor': this.props.cancelCanInfoInstructor();break;
            case 'candidate': this.props.cancelCanInfoCandidate();break;
        }
    };



    selectJobHandler = (event) => {
       this.setState({selectedJob:  event.target.value})
    }


    displayItSkill = () =>{
        if(Object.keys(this.props.canInfo['skill_set']).length > 0){
            const lis = Object.keys(this.props.canInfo['skill_set']).map((val,index)=>{
                changeCSSPercent(`skill-${index+1}`,`${this.props.canInfo['skill_set'][val]}%`);
                return (
                    <li key={index}>
                        <a href="">{val}</a>
                        <div className="percentage">
                            <div className="left"></div>
                            <div className="perct">{this.props.canInfo['skill_set'][val]}%</div>
                        </div>
                    </li>
                )
            })
            return lis;
        }else{
            return <li></li>;
        }
    }

    displayExperience = () =>{
        if(this.props.canInfo['experiences'].length > 0){
            var li = this.props.canInfo.experiences.map((exp,index)=>{
                var date = exp['description'].split("\n")[0];
                var description = exp['description'].split("\n")[1];
                return(
                    <li className="experience" key={index}>
                        <div className="title" >{exp.name}</div>
                        <div className="date" >{date}</div>
                        <div className="text">
                            <p>{description}</p>
                        </div>
                    </li>
                )
            })
            return li;
        }else {
            return <li></li>
        }
    }

    displayEducation = () =>{
        if(this.props.canInfo['education_exp'].length > 0){
            var li = this.props.canInfo['education_exp'].map((edu,index)=>{
                return(
                    <li className="edu" key={index}>
                        <div className="title">{edu['university']}</div>
                        <div className="date">{edu['time_during']}</div>
                        <div className="degree">- {edu['degree']} of {edu['major']}</div>
                    </li>
                )
            })
            return li;
        }else {
            return null
        }
    }

    displayPersonalSill = () =>{
            if(this.props.canInfo['personal_skill'].length > 0){
                var li = this.props.canInfo['personal_skill'].map((skill,index)=>{
                    return(
                        <li className="ps" key={index}>
                            <span>{skill}</span>
                        </li>
                    )
                })
                return li;
            }else {
                return <li></li>
            }
        }

    displayProject = () =>{
        if(this.props.canInfo['project_list'].length > 0){
            var li = this.props.canInfo['project_list'].map((prj,index)=>{
                return(
                    <li key={index}>
                        <div>{prj.name}</div>
                        <div className='project-link'>- {prj.link}</div>
                    </li>
                )
            })
            return li;
        }else {
            return <li></li>
        }
    }

    scheduleHandler = () =>{
        var interviewId;
        const data = {
            'job_info_id':this.state.selectedJob,
            'interview_id':interviewId,
            'student_id':this.props.canInfo['username'],
            'status_uuid': nextJobState[this.props.canInfo['jobState']][2]
        };
        this.props.scheduleCan(data);
    };



    render() {
        console.log(this.props.canInfo);
        if(!this.props.canInfo){return null}
        const jobOptions = this.props.openJobs.map((job)=>{
            let title = job['job_title'];
            let id = job['job_info_id'];
            return <option value={id} key={id}>{title}</option>
        });
        var options;
        var btn;
        if(this.props.canInfo.jobState==='Got offer' || this.props.role==='instructor' || this.props.role==='candidate'|| !this.props.canInfo.jobState){
            options = null;
            btn=null;
        }else{
            options = (<select name="" id="select_job" onChange={this.selectJobHandler}>{jobOptions}</select>)
            btn = (<button type="button" onClick={this.scheduleHandler}>
                {nextJobState[this.props.canInfo.jobState][1]}
                </button>)
        }
        if(this.props.searchOrHome==='Home'){
            btn = (<button type="button"
                           className='search-save-job'
                           onClick={()=>this.props.saveCan(this.props.role, this.props.canInfo['student_id'])}
                >
                Save
            </button>)
        }
        const itSkillList = this.displayItSkill();
        const expList = this.displayExperience();
        const eduList = this.displayEducation();
        const personalSkillList = this.displayPersonalSill();
        const projList = this.displayProject();
        return(
            <div className="candidate-popup" style={{'top':this.props.canInfo.top}} >
                <div className="top">
                    <div className="name">{this.props.canInfo['name']}</div>
                    <div className="top-contact">
                        <div className="bottom">
                            <div className="contact-l">
                                <div className="contact-icon"><i className="far fa-envelope"></i></div>
                                <div className="text">Email:</div>
                                <div className="email">{this.props.canInfo['email']}</div>
                            </div>
                            <div className="contact-l">
                                <div className="contact-icon"><i className="fas fa-phone"></i></div>
                                <div className="text">Phone:</div>
                                <div className="phone">{this.props.canInfo['personal_info']['phone']}</div>
                            </div>
                            <div className="contact-l">
                                <div className="contact-icon"><i className="fab fa-github"></i></div>
                                <div className="text">Github:</div>
                                <div className="github">{this.props.canInfo['personal_info']['link']}</div>
                            </div>
                        </div>
                    </div>
                    <img src="/images/profileImg1.jpg" className="img-popup" alt="user portrait" />
                </div>
                <div className="bottom">
                    <div className="about-me">
                        <div className="line-text">
                            <div className="text">About Me</div>
                            <div id="successAlert2" className="alert alert-success longin-alert" role="alert"
                                 style={{display:'none'}}>Successfully schedual an interview!
                            </div>
                            <div id="errorAlert2" className="alert alert-danger longin-alert" role="alert"
                                 style={{display:'none'}}></div>

                            {options}
                            <div className="save-can">
                                {btn}
                            </div>
                            <div className="line"></div>
                        </div>
                        <div className="profile edit">
                            <p>{this.props.canInfo['about_me']}</p>
                        </div>

                    </div>
                    <div className="home-tech-skills">
                        <div className="line-text">
                            <div className="text">Technical Skills</div>
                            <div className="line"></div>
                        </div>
                        <div className="skill-lists">
                            <ul>
                                {itSkillList}
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
                                {projList}
                            </ul>
                        </div>
                    </div>
                    <div className="home-experience">
                        <div className="line-text">
                            <div className="text">Experience</div>
                            <div className="line"></div>
                        </div>
                        <ul className="all-experience">
                            {expList}
                        </ul>
                    </div>
                    <div className="home-education">
                        <div className="line-text">
                            <div className="text">Education</div>
                            <div className="line"></div>
                        </div>
                        <ul className="all-edu">
                            {eduList}
                        </ul>
                    </div>
                    <div className="personal-skill">
                        <div className="line-text">
                            <div className="text">Personal Skills</div>
                            <div className="line"></div>
                        </div>
                        <ul>
                            {personalSkillList}
                        </ul>
                    </div>
                </div>
            </div>

        )
    }

}

const mapStateToProps = state => {
    let jobs;
    let cans;
    if(state.auth.role === 'employer'){
        jobs = state.employer.allData['open_job_list'];
        cans = state.employer.canInfo
    }else{
        jobs = state[state.auth.role].allData['saved_job_list'];
        cans = state[state.auth.role].canInfo
    }
    var firstJob = null;
    if(jobs.length>0){firstJob=jobs[0]['job_info_id']}
    return{
        role: state.auth.role,
        openJobs: jobs,
        firstJob:firstJob,
        canInfo: cans,
        searchCan: state.searchResult.allCans,
        searchOrHome: state.searchResult.searchOrHome
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        cancelCanInfo: () => dispatch(actions.cancelCanInfo()),
        cancelCanInfoInstructor: () => dispatch(actions.cancelCanInfoInstructor()),
        cancelCanInfoCandidate: () => dispatch(actions.cancelCanInfoCandidate()),
        scheduleCan: (data) => dispatch(actions.scheduleCan(data)),
        saveCan: (role, id) => dispatch(actions.saveCan(role,id))
    }
}


var clickOutsideConfig = {
    handleClickOutside: function(instance) {
        return instance.myClickOutsideHandler;
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(onClickOutside(CanInfo,clickOutsideConfig));