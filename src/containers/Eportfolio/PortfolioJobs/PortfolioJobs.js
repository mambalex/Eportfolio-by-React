import React, {Component} from 'react';
import { connect } from 'react-redux';
import './PortfolioJobs.css';
import * as actions from "../../../store/actions";
import JobInfo from "../../Jobs/JobInfo/JobInfo";


class PortfolioJobs extends Component {

    showJobInfoHandler = (event, job) =>{
        const top = event.pageY-80;
        const jobInfo = {
            title : job['job_name'],
            salary : job['salary'],
            location : job['location'],
            company : job['company_name'],
            workType : job['job_type'],
            jobSummary : job['description'],
            responsibilities : job['responsibility'],
            ITSkill : job['itskill'],
            personalStrengths : job['personal_strength'],
            others : job['others'],
            jobId: job['job_info_id']
        };
        this.props.showJobInfo(jobInfo, top);
    }

    render() {
        const saveJobs = this.props.savedJobList.map((job)=>{
            return(
                <li className="text">
                    <span className="text popup"
                          onClick={(e)=>this.showJobInfoHandler(e, job)}
                    >
                        {job['job_name']}
                    </span>
                    <i className="far fa-trash-alt " onClick={()=>this.props.deleteJob(job['job_info_id'])}></i>
                </li>
            )
        });
        const rcmJobs = this.props.rcmdJobList.map((job)=>{
            return(
                <li>
                    <div className="job popup"
                         onClick={(e)=>this.showJobInfoHandler(e, job)}
                    >{job['job_name']}</div>
                    <div className="referrer">by<a href="">{job['referrer']}</a></div>
                </li>
            )
        });
        return(
            <div className='PortfolioJobs'>
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
        )
    }
}

const mapStateToProps = state => {
    return{
        savedJobList : state.candidate.savedJobList,
        rcmdJobList : state.candidate.rcmdJobList
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        showJobInfo: (jobInfo, top) => dispatch(actions.showJobInfoCandidate(jobInfo, top)),
        deleteJob: (id) => dispatch(actions.deleteSavedJob(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioJobs);