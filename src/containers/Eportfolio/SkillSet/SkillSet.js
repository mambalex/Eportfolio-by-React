import React, {Component} from 'react';
import { connect } from 'react-redux';
import './SkillSet.css'
import {updateObject} from "../../../utility/utility";
import * as actions from "../../../store/actions";



class SkillSet extends Component {
    state={
        skill:'',
        percent: '',
        courseCode: '',
        courseName: ''
    }

    // deleteSkillHandler = (e, skill) => {
    //     let newList = {...this.state.skillList}
    //     delete newList[skill]
    //     this.setState({skillList:newList})
    // }

    addSkillHandler = ( skill, percent) => {
        this.props.addSkill(skill, percent);
        this.setState({skill:'', percent:''});
    }

    changeHandler = (event, type) =>{
        this.setState({[type]:event.target.value})
    }


    // deleteCourseHandler = (e, code) => {
    //     let newList = [...this.state.courseList];
    //     newList = newList.filter(function (cour) {
    //         return cour.code !== code
    //     })
    //     this.setState({courseList:newList})
    // }

    addCourseHandler = (code, name) => {
        this.props.addCourse(code,name);
        this.setState({courseCode:'', courseName:''});
    };

    render() {
        const skills = Object.keys(this.props.skillList).map((skill,index)=>{
            return (
                <li className="text" key={index}>
                    <div className="text">{skill}</div>
                    <div className="percent">{this.props.skillList[skill]}%</div>
                    <i className="far fa-trash-alt " onClick={()=>this.props.deleteSkillHandler(skill)}></i>
                </li>
            )
        })
        const courses = this.props.courseList.map((cour,index)=>{
            return(
                <li className="course" key={index}>
                    <div className="wrapper">
                        <div className="course-title">{cour['code']}</div>
                        <div className="text">-{cour['name']}</div>
                        <i className="far fa-trash-alt " onClick={()=>this.props.deleteCourseHandler(cour.code)} ></i>
                    </div>
                </li>
            )
        });
        return(
            <div className="skill-set">
                <div className="title"><h2>Skill Set</h2></div>
                <div className="bottom">
                    <div className="skills">
                        <ul className="skill-list">
                            {skills}
                        </ul>
                    </div>
                    <div className="skill-form">
                        <input id="skillEnter"
                               name="skill" className="input form-control"
                               placeholder="Enter skill here"
                               value={this.state.skill}
                               onChange={(e)=>this.changeHandler(e,'skill')}
                        />
                            <input  type='number'
                                     max='100'
                                    id="percentage"
                                    className="form-control"
                                    placeholder="Enter percentage here"
                                    value={this.state.percent}
                                    onChange={(e)=>this.changeHandler(e,'percent')}
                            />
                            <button className="add" onClick={()=>this.addSkillHandler(this.state.skill, this.state.percent)}>Add</button>
                    </div>
                </div>
                <div className="title"><h2>Courses</h2></div>
                <div className="courses-wrapper">
                    <ul className="courses">
                        {courses}
                    </ul>
                    <div className="skill-form">
                        <input id="skillEnter"
                               name="skill" className="input form-control"
                               placeholder="Course code"
                               value={this.state.courseCode}
                               onChange={(e)=>this.changeHandler(e,'courseCode')}
                        />
                        <input
                                id="percentage"
                                className="form-control"
                                placeholder="Course name"
                                value={this.state.courseName}
                                onChange={(e)=>this.changeHandler(e,'courseName')}
                        />
                        <button className="add" onClick={()=>this.addCourseHandler(this.state.courseCode, this.state.courseName)}>Add</button>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return{
        skillList: state.candidate.skillList,
        courseList: state.candidate.courseList
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        addSkill: (skill, percent) => dispatch(actions.addSkill(skill, percent)),
        deleteSkillHandler: (skill) => dispatch(actions.deleteSkill(skill)),
        addCourse: (courseCode, courseName) => dispatch(actions.addCourse(courseCode, courseName)),
        deleteCourseHandler: (code) => dispatch(actions.deleteCourse(code))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SkillSet);


