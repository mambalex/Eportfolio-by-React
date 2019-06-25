import React, {Component} from 'react';
import { connect } from 'react-redux';
import './JobInfo.css';
import * as actions from '../../../store/actions/index';
import onClickOutside from 'react-onclickoutside';


class JobInfo extends Component {
    myClickOutsideHandler = () => {
        switch (this.props.role) {
            case 'employer':this.props.cancelJobInfo();break;
            case 'instructor': this.props.cancelJobInfoInstructor();break;
            case 'candidate': this.props.cancelJobInfoCandidate();break;
        }
    }

    deleteJobHandler = (event, jobId) => {
        this.props.deleteJob(jobId)
    }

    displayList = (listName) =>{
        if(this.props.jobInfo[listName].length > 0){
            const lis = this.props.jobInfo[listName].map((val,index)=>{
                return (
                    <li key={index}>{val}</li>
                )
            })
            return lis;
        }else{
            return null;
        }
    }


    render() {
        console.log(this.props.jobInfo);
        if(!this.props.jobInfo){return null}
        return(
            <div className="job-popup" style={{'top':this.props.jobInfo.top}}>
                <div className="title">
                    <span>
                        {this.props.jobInfo['title']}
                    </span>
                    {this.props.searchOrHome==='Home'?<button className='update' type="button" onClick={() => this.props.saveJob( this.props.role,this.props.jobInfo.jobId)}>Save</button>:null}
                    {this.props.role==='employer'&&this.props.searchOrHome==='Search'?<button className='deleteBtn' type="button" onClick={(event) => this.deleteJobHandler(event, this.props.jobInfo.jobId)}>Delete this job</button>:null}
                </div>
                <div className="salary-location">
                    <div className="salary list">
                        <i className="flaticon-money"></i>
                        <span className="left">Salary:</span>
                        <span id="salary">{this.props.jobInfo['salary']}</span>
                        <span className="per-year">{this.props.jobInfo['salary']?'per year':''}</span>
                    </div>
                    <div className="location list">
                        <i className="flaticon-pin"></i>
                        <span className="left">Location:</span>
                        <span id="lct">{this.props.jobInfo['location']}</span>
                    </div>
                    <div className="company list">
                        <i className="flaticon-branch"></i>
                        <span className="left">Company:</span>
                        <span id="company">{this.props.jobInfo['company']}</span>
                    </div>
                    <div className="work-type list">
                        <i className="flaticon-bag"></i>
                        <span className="left">Work Type:</span>
                        <span id="work-type">{this.props.jobInfo['workType']}</span>
                    </div>
                </div>
                <div className="job-summary">Job Summary:</div>
                <div className="description">
                    <p>{this.props.jobInfo['jobSummary']}</p>
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
        )
    }
}

const mapStateToProps = state => {
    let jobInfo;
    jobInfo = state[state.auth.role].jobInfo;
    // if(state.auth.role === 'employer'){
    //     jobInfo = state.employer.jobInfo;
    // }else{
    //     jobInfo = state.instructor.jobInfo;
    // }
    return{
        role: state.auth.role,
        jobInfo: jobInfo,
        searchOrHome: state.searchResult.searchOrHome
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        cancelJobInfo: () => dispatch(actions.cancelJobInfo()),
        cancelJobInfoInstructor: () => dispatch(actions.cancelJobInfoInstructor()),
        cancelJobInfoCandidate: () => dispatch(actions.cancelJobInfoCandidate()),
        deleteJob: (jobId) => dispatch(actions.deleteJob(jobId)),
        saveJob: (role,jobId) => dispatch(actions.saveJob(role,jobId))
    }
}

var clickOutsideConfig = {
    handleClickOutside: function(instance) {
        return instance.myClickOutsideHandler;
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(onClickOutside(JobInfo,clickOutsideConfig));