import React from 'react';


const Connection = (props) =>(
    <li className="connection-item">
        <div className="can-job-link">
            <div className="job">
                <div className="title">{props.jobName}</div>
                <div className="info saved">
                    <button onClick={(e)=>props.jobClick(e, props.jobId)}>More info</button>
                </div>
            </div>
            <div className="link"><i className="fas fa-link"></i></div>
            <div className="candidate">
                <div className="title">{props.canName}</div>
                <div className="candidate-info saved">
                    <button onClick={(e)=>props.canClick(e, props.canId)}>More info</button>
                </div>
            </div>
        </div>
    </li>
)

export default Connection;