import React from 'react';

import classes from './Job.module.css';

const Job = (props) => {
    return (
     <div className={classes['jobs-container']}>
        <div className={classes.top}>
            <div className={classes.title}>
                <span className={classes.dot}></span>
                <span className={classes['job-title']}>{props.title}</span>
                <i className="fas fa-map-marker-alt"></i>
                <span className={classes.location}>{props.location}</span>
            </div>
            <div className={classes.info}>
                <button type="button" onClick={(e) => props.click(e, props.jobInfo)}>More Info</button>
            </div>

        </div>

        <div className={classes.middle}>
            <div className={classes['middle-container']}>
                <div><i className="fas fa-users"></i></div>
                <div className={classes['num-text']}>
                    <div className={classes.num}>{props.candidates}</div>
                    <div className={classes.text}>Candidates</div>
                </div>

            </div>
            <div className={classes['middle-container']}>
                <div><i className="flaticon-interview"></i></div>
                <div className={classes['num-text']}>
                    <div className={classes.num}>{props.firstInterview}</div>
                    <div className={classes.text}>Interviews</div>
                </div>
            </div>
            <div className={`${classes['middle-container']} ${classes.test}`}>
                <div><i className="flaticon-test"></i></div>
                <div className={classes['num-text']}>
                    <div className={classes.num}>{props.test}</div>
                    <div className={classes.text}>Tests</div>
                </div>
            </div>
            <div className={classes['middle-container']}>
                <div><i className="flaticon-interview"></i></div>
                <div className={classes['num-text']}>
                    <div className={classes.num}>{props.secondInterview}</div>
                    <div className={classes.text}>2nd Interviews</div>
                </div>
            </div>
            <div className={classes['middle-container']}>
                <div><i className="flaticon-offer"></i></div>
                <div className={classes['num-text']}>
                    <div className={classes.num}>{props.offers}</div>
                    <div className={classes.text}>Offers</div>
                </div>
            </div>

            <div className={`${classes['middle-container']} ${classes.engaged}`}>
                <div><i className="flaticon-agreement"></i></div>
                <div className={classes['num-text']}>
                    <div className={classes.num}>{props.engaged}</div>
                    <div className={classes.text}>Engaged</div>
                </div>
            </div>

        </div>
        <div className={classes.bottom}>
            <div><i className="far fa-clock"></i>published on {props.date}  </div>
            <div className={classes.interested}><i className="fas fa-users"></i> {props.totalCan} people interested
            </div>
        </div>
    </div>
    )
}

export default Job;