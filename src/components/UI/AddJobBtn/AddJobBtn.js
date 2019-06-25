import React from 'react';
import './AddJobBtn.css';

const AddJobBtn = (props) => (
    <div className="add-jobs" >
        <i className="fas fa-plus-circle fa-2x" onClick={props.click}></i>
    </div>
);

export default AddJobBtn;