import React, {Component} from 'react';
import { connect } from 'react-redux';
import Job from '../../components/Job/Job';
import AddJobBtn from '../../components/UI/AddJobBtn/AddJobBtn';
import Newjob from './Newjob/Newjob';
import JobInfo from './JobInfo/JobInfo';
import './Jobs.css';
import * as actions from '../../store/actions/index';

class Jobs extends Component {


    componentDidMount() {
        if(!this.props.employerData && this.props.role==='employer'){this.props.fetchEmployerData();}
        if(!this.props.instructorData && this.props.role==='instructor'){this.props.fetchInstructorData();}
    }

    showJobInfo=(event, jobInfo)=>{
        const top = event.pageY-300;
        if(this.props.role ==='employer'){
            this.props.showJobHandler(jobInfo, top);
        }else{
            this.props.showJobInstructorHandler(jobInfo, top);
        }
    };

    render(){
        var jobs = null;
        console.log(this.props.employerData,this.props.isLoading)
        if(this.props.role==='employer'){
            if (this.props.isLoading){return <p>Loading employer data...</p>;}
            if (this.props.hasError) {return <p>Sorry! There was an error loading the data</p>;}
            if(this.props.employerData){
                jobs  = this.props.employerData['open_job_list'].map((job)=>{
                    const jobInfo = {
                        title : job['job_title'],
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
                    return <Job
                        click={this.showJobInfo}
                        jobInfo={jobInfo}
                        jobId={job['job_info_id']}
                        title={job['job_title']}
                        location={job['location']}
                        key={job['job_info_id']}
                        candidates={job["resume_list"].length}
                        firstInterview={job['first_interview_list'].length}
                        test={job['test_list'].length}
                        secondInterview={job['second_interview_list'].length}
                        offers={job['offer_list'].length}
                        engaged={job['engaged_list'].length}
                        date={job['date'].split(" ")[0]}
                        totalCan={job["resume_list"].length+job['first_interview_list'].length+job['second_interview_list'].length+job['test_list'].length+job['offer_list'].length+job['engaged_list'].length}
                    />
                });
                return(
                    <div className='Jobs'>
                        <AddJobBtn click={this.props.addJobHandler}/>
                        <Newjob />
                        <JobInfo />
                        {jobs}
                    </div>
                )
                }else{return(<div className='Jobs'></div>)}
        }
        if(this.props.role==='instructor'){
            if (this.props.instructorLoading){return <p>Loading instructor data...</p>;}
            if (this.props.instructorError) {return <p>Sorry! There was an error loading the data</p>;}
            if(this.props.instructorData){
                jobs  = this.props.instructorData['saved_job_list'].map((job)=>{
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
                    return <Job
                        click={this.showJobInfo}
                        jobInfo={jobInfo}
                        jobId={job['job_info_id']}
                        title={job['job_name']}
                        location={job['location']}
                        key={job['job_info_id']}
                        candidates={job["resume_list"].length}
                        firstInterview={job['first_interview_list'].length}
                        test={job['test_list'].length}
                        secondInterview={job['second_interview_list'].length}
                        offers={job['offer_list'].length}
                        engaged={job['engaged_list'].length}
                        date={job['date'].split(" ")[0]}
                        totalCan={job["resume_list"].length+job['first_interview_list'].length+job['second_interview_list'].length+job['test_list'].length+job['offer_list'].length+job['engaged_list'].length}
                         />
                    });
                    return(
                        <div className='Jobs'>
                            <JobInfo />
                            {jobs}
                        </div>
                    )
                }else{return(<div className='Jobs'></div>)}
            }
}}

const mapStateToProps = state => {
    return{
        role:state.auth.role,
        employerData: state.employer.allData,
        hasError: state.employer.hasErrored,
        isLoading: state.employer.isLoading,
        instructorData: state.instructor.allData,
        instructorError: state.instructor.hasErrored,
        instructorLoading: state.instructor.isLoading,

    }
}

const mapDispatchToProps = dispatch =>{
    return{
        addJobHandler: () => dispatch(actions.addJob()),
        showJobHandler: (jobInfo, top) => dispatch(actions.showJobInfo(jobInfo, top)),
        showJobInstructorHandler: (jobInfo, top) => dispatch(actions.showJobInfoInstructor(jobInfo, top)),
        fetchEmployerData: () => dispatch(actions.fetchEmployerData()),
        fetchInstructorData: () => dispatch(actions.fetchInstructorData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);