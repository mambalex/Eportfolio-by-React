import React, {Component} from 'react';
import { connect } from 'react-redux';
import './Candidates.module.css';
import Candidate from '../../components/Candidate/Candidate';
import  CanInfo from './CanInfo/CanInfo';
import * as actions from "../../store/actions";
import uuid from "uuid";


class Candidates extends Component{

    showCanInfoHandler = (event, canInfo, jobState) =>{
        const top = event.pageY-200;
        if(this.props.role ==='employer'){
            this.props.showCanInfo(canInfo, top, jobState)
        }else{
            this.props.showCanInfoInstructor(canInfo, top, jobState)
        }
    }


    displayCandidates =(cans, canType)=> {
            var candidateType = canType;
            return cans.map((can)=>{
                if(canType==='Recommeded'){candidateType=`Recommeded by ${can['referrer']}`};
                return<Candidate
                    key={uuid.v4()}
                    canInfo={can}
                    image='/images/profileImg1.jpg'
                    canType={candidateType}
                    click={this.showCanInfoHandler}
                />
            })
    }

    render() {
        if(this.props.role==='employer'){
            if (this.props.isLoading){return <p>Loading candidate data...</p>;}
            if (this.props.hasError) {return <p>Sorry! There was an error loading the data</p>;}
            if(this.props.canData) {
                    var savedCandidates = this.displayCandidates(this.props.canData['Saved candidate'], 'Saved candidate');
                    var testCans = this.displayCandidates(this.props.canData['Test'], 'Test');
                    var gotOfferCans = this.displayCandidates(this.props.canData['Got offer'], 'Got offer');
                    var engagedCans = this.displayCandidates(this.props.canData['Engaged'], 'Engaged');
                    return (
                        <div>
                            <CanInfo/>
                            {savedCandidates}
                            {testCans}
                            {gotOfferCans}
                            {engagedCans}
                        </div>
                    )
            }
        }
        if(this.props.role==='instructor') {
            if (this.props.instructorLoading) {
                return <p>Loading candidate data...</p>;
            }
            if (this.props.instructorError) {
                return <p>Sorry! There was an error loading the data</p>;
            }
            if (this.props.instructorCanData) {
                var savedCans = this.displayCandidates(this.props.instructorCanData['saved_user_list'], 'Saved candidate');
                return (
                    <div>
                        <CanInfo/>
                        {savedCans}
                    </div>
                )
            }
        }
    }
}

const mapStateToProps = state => {
    return{
        role:state.auth.role,
        canData: state.employer.canData,
        hasErrored: state.employer.hasErrored,
        isLoading: state.employer.isLoading,
        instructorCanData: state.instructor.allData,
        instructorError: state.instructor.hasErrored,
        instructorLoading: state.instructor.isLoading,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        showCanInfo: (canInfo, top, jobState) => dispatch(actions.showCanInfo(canInfo, top, jobState)),
        showCanInfoInstructor: (canInfo, top, jobState) => dispatch(actions.showCanInfoInstructor(canInfo, top, jobState))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Candidates);