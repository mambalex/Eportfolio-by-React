import React from 'react';
import classes from './Candidate.module.css';


const Candidate =(props)=> {
    var savedCanStyle='';
    if(props.canType==='Saved candidate'){
        savedCanStyle = classes['savedCan']
    }

    return (
    <div className={classes["candidates-container"]} style={{display: 'flex'}}>
        <div className={classes["top"]}>
            <div className={classes["name"]}><span><i className="fas fa-user-alt"></i></span>
                <span>{props.canInfo.name}</span>
                <i className="fas fa-map-marker-alt"></i>
                <span className={classes["location"]}>{props.canInfo.location}</span>
            </div>
            {/*<div className={classes['id']}>{props.id}</div>*/}
            {/*<div className={classes["interviewId"]}>{props.interviewId}</div>*/}
            <div className={classes["candidate-info"]}>
                <button type="button" onClick={(event)=>props.click(event, props.canInfo, props.canType)}>More Info</button>
            </div>
        </div>
        <div className={classes["middle"]}>
            <img src={props.image} alt="user portrait"/>
            <div className={classes["profile-icon"]}>
                <i className="fas fa-address-card fa fa-2x"></i>
            </div>
            <div className={classes["profile"]}> {props.canInfo['about_me']} </div>
        </div>

        <div className={classes["bottom"]}>
            <div className={classes["job-name"]}>
                <div className={ `${savedCanStyle} ${classes["job-tag"]}`}>
                    <span><i className="fas fa-briefcase"></i></span>
                    <span>Applying for {props.canInfo['job_name']}</span>
                </div>
            </div>
            <div className={classes["job-tag"]}><i className="fas fa-user-alt canType"></i>{props.canType}</div>

        </div>
    </div>)

}


export default Candidate;