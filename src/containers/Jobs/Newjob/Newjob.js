import React, {Component} from 'react';
import { connect } from 'react-redux';
import './Newjob.css';
import * as actions from '../../../store/actions/index';
import onClickOutside from 'react-onclickoutside';
import axios from 'axios';


const placeHolder = {
    "responsibilities":'Responsibility',
    "ITSkill": 'IT skill',
    "personalStrengths": 'Personal Strength',
    "others": 'Other'
}

class Newjob extends Component {
        state={
            "title":'',
            "salary":'',
            "location":'',
            "company":'',
            "workType":'',
            "jobSummary":'',
            "responsibilities":[],
            "ITSkill":[],
            "personalStrengths":[],
            "others":[]
        }

        myClickOutsideHandler = () => {
            this.props.cancelNewJob()
        }


        changeHandeler = (event, type, index)=>{
            var newState = {...this.state}
            if(type==='responsibilities' ||type==='ITSkill' ||type==='personalStrengths' ||type==='others' ){
                newState[type][index] = event.target.value;
            }else{
                newState[type] = event.target.value;
            }
            this.setState(newState)
        }

        addLiHandeler = (event, type) =>{
            // let array = this.state[type].concat(['']);
            // let newState = {};
            // newState[type] = array;
            // this.setState(newState)
            this.setState({[type]: this.state[type].concat([''])})
        }

        removeLiHandeler = (event, type, index) =>{
            let newArray = [...this.state[type]];
            newArray.splice(index, 1);
            this.setState({[type]: newArray})
        }

        displayList = (listName) =>{
            if(this.state[listName].length > 1){
                const lis = this.state[listName].slice(1).map((val,index)=>{
                    index++;
                    var clsname = `add-${listName}`;
                    return (
                        <li key={index}>
                            <input type="" className={clsname} placeholder={placeHolder[listName]}
                                   value={val}
                                   onChange={(event)=>this.changeHandeler(event,listName,index)}
                            />
                            <i className="material-icons remove" onClick={(event)=>this.removeLiHandeler(event,listName, index)}>remove_circle_outline</i>
                        </li>
                    )
                })
                return lis;
            }else{
                return null;
            }
        }


        createNewJobHandler = () => {
            const url = 'http://localhost:5000/api/create_job_info';
            console.log(this.state)
            const data = {create_job: this.state};
            console.log(data)
            const  config = {
                headers:{
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Basic ' + btoa(localStorage.getItem('token')+':')
                }
            }
            axios.post(url,data,config)
                .then((response) => {
                    console.log(response);
                    this.setState(      {
                        "title":'',
                        "salary":'',
                        "location":'',
                        "company":'',
                        "workType":'',
                        "jobSummary":'',
                        "responsibilities":[],
                        "ITSkill":[],
                        "personalStrengths":[],
                        "others":[]
                    });
                    this.myClickOutsideHandler();
                    this.props.fetchEmployerData();
                })
                .catch((err) => console.log(err));
        }


        render() {
            if(!this.props.newJob){return(null)}
            var respnList = this.displayList('responsibilities');
            var itSillList = this.displayList('ITSkill');
            var psList = this.displayList('personalStrengths');
            var otherList = this.displayList('others');
            return(
            <div className="new-opening-job ">
                <div className="title">
                    <div className="job-title">
                        <input type="text" placeholder="Job title" value={this.state['title']} onChange={ (event) => this.changeHandeler(event,'title')} />
                    </div>
                    {/*<i className="fas fa-backspace job-creation-close"></i>*/}
                    <div id="successAlert" className="alert alert-success longin-alert" role="alert"
                           style={{display: 'none'}}></div>
                    <div id="errorAlert" className="alert alert-danger longin-alert" role="alert"
                           style={{display: 'none'}}></div>
                </div>

                <div className="salary-location">
                    <div className="salary list">
                        <i className="flaticon-money"></i>
                        <span className="left">Salary:</span>
                        <input type="text" name="add-salary" placeholder="salary"
                               value={this.state['salary']} onChange={ (event) => this.changeHandeler(event,'salary')}
                        />
                    </div>
                    <div className="location list">
                        <i className="flaticon-pin"></i>
                        <span className="left">Location:</span>
                        <input type="text" name="add-location" placeholder="location"
                               value={this.state['location']} onChange={ (event) => this.changeHandeler(event,'location')}
                        />
                    </div>
                    <div className="company list">
                        <i className="flaticon-branch"></i>
                        <span className="left">Company:</span>
                        <input type="text" name="add-company" placeholder="Company"
                               value={this.props.username}
                        />
                    </div>
                    <div className="work-type list">
                        <i className="flaticon-bag"></i>
                        <span className="left">Work Type:</span>
                        <input type="text" name="add-work-type" placeholder="Work Type"
                               value={this.state['workType']} onChange={ (event) => this.changeHandeler(event,'workType')}
                        />
                    </div>
                    <div className="create-job">
                        <button type="button" onClick={this.createNewJobHandler}>Create a Job</button>
                    </div>
                </div>
                <div className="job-summary">Job Summary:</div>
                <div className="description">
                    <textarea name="textarea" className="add-job-summary" placeholder="Job Summary"
                              value={this.state['jobSummary']} onChange={ (event) => this.changeHandeler(event,'jobSummary')}
                    ></textarea>
                </div>
                <div className="job-responsibilities">Responsibilities:</div>
                <div className="responsibilities">
                    <ul>
                        <li>
                            <input placeholder="responsibilities"
                                   value={this.state.responsibilities.length>0 ? this.state.responsibilities[0]:''}
                                   onChange={(event)=>this.changeHandeler(event,"responsibilities",0)}
                            />
                                <button onClick={(event)=>this.addLiHandeler(event,"responsibilities")}>Add</button>
                        </li>
                        {respnList}
                    </ul>

                </div>
                <div className="skills-required-title">Software and IT Skills Required:</div>
                <div className="skills-required">
                    <ul>
                        <li>
                            <input placeholder="IT skill"
                                   value={this.state.ITSkill.length>0 ? this.state.ITSkill[0]:''}
                                   onChange={(event)=>this.changeHandeler(event,"ITSkill",0)}
                            />
                            <button onClick={(event)=>this.addLiHandeler(event,"ITSkill")}>Add</button>
                        </li>
                        {itSillList}
                    </ul>
                </div>
                <div className="personal-skills-title">Personal Attributes and Strengths:</div>
                <div className="personal-skills">
                    <ul>
                        <li>
                            <input placeholder="Personal Strength"
                                   value={this.state.personalStrengths.length>0 ? this.state.personalStrengths[0]:''}
                                   onChange={(event)=>this.changeHandeler(event,"personalStrengths",0)}
                            />
                            <button onClick={(event)=>this.addLiHandeler(event,"personalStrengths")}>Add</button>
                        </li>
                        {psList}
                    </ul>
                </div>
                <div className="others-title">Others:</div>
                <div className="others">
                    <ul>
                        <li>
                            <input placeholder="Others"
                                   value={this.state.others.length>0 ? this.state.others[0]:''}
                                   onChange={(event)=>this.changeHandeler(event,"others",0)}
                            />
                            <button onClick={(event)=>this.addLiHandeler(event,"others")}>Add</button>
                        </li>
                        {otherList}
                    </ul>
                </div>
            </div>
            )
        }
}

const mapStateToProps = state => {
    return{
        username: state.employer.allData.username,
        newJob: state.employer.newJob
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        cancelNewJob: () => dispatch(actions.cancelNewJob()),
        fetchEmployerData: () => dispatch(actions.fetchEmployerData())
    }
}

var clickOutsideConfig = {
    handleClickOutside: function(instance) {
        return instance.myClickOutsideHandler;
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(onClickOutside(Newjob,clickOutsideConfig));