import React, {Component} from 'react';
import { connect } from 'react-redux';
import './Connections.css';
import * as actions from "../../store/actions";
import Connection from '../../components/Connection/Connection'
import CanInfo from "../Candidates/CanInfo/CanInfo";
import JobInfo from "../Jobs/JobInfo/JobInfo";
import NewConnection from "./NewConnection/NewConnection"


class Connections extends Component{

    showJobInfoHandler=(event, jobId)=>{
        const top = event.pageY-200;
        var jobInfo;
        this.props.jobList.forEach((job)=>{
            if(job['job_info_id'] === jobId){
                jobInfo = {
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
            }
        })
        this.props.showJobInstructor(jobInfo, top);
    };

    showCanInfoHandler = (event, canId) =>{
        const top = event.pageY-200;
        var canInfo;
        this.props.canList.forEach((can)=>{
            if(can.username === canId){
                canInfo = can;
            }
        })
        this.props.showCanInfoInstructor(canInfo, top, null);

    };

    showNewConHandler = (event) =>{
        this.props.showNewCon();
    };

    render() {
        const connections = this.props.connectionList.map((con,index)=>{
            return (
                <Connection
                    key={index}
                    jobName={con['job_title']}
                    canName={con['student_name']}
                    jobId={con['job_info_id']}
                    canId={con['student_id']}
                    jobClick={this.showJobInfoHandler}
                    canClick={this.showCanInfoHandler}
                />
            )
        });
        return (
            <div className='connections-container'>
                <div className="add-connections">
                    <i className="fas fa-plus-circle fa-2x add-connections-btn" onClick={this.showNewConHandler}></i></div>
                <ul className="connection-list">
                    <CanInfo/>
                    <JobInfo />
                    {connections}
                </ul>
                <NewConnection />
            </div>
        );
    }
}

const mapStateToProps = state => {
    // var conList=[];
    // var temp={};
    // state.instructor.allData['connection_list'].forEach((con)=>{
    //     if( con['student_id'] in temp && temp[con['student_id']]=== con['job_info_id'] ){return}
    //     else{
    //         temp[con['student_id']] = con['job_info_id'];
    //         conList.push(con)
    //     }
    // });
    return{
        connectionList: state.instructor.connectionList,
        canList: state.instructor.allData['saved_user_list'],
        jobList: state.instructor.allData['saved_job_list'],
        instructorError: state.instructor.hasErrored,
        instructorLoading: state.instructor.isLoading,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        showJobInstructor: (jobInfo, top) => dispatch(actions.showJobInfoInstructor(jobInfo, top)),
        showCanInfoInstructor: (canInfo, top, jobState) => dispatch(actions.showCanInfoInstructor(canInfo, top, jobState)),
        showNewCon: () => dispatch(actions.showNewCon())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Connections);