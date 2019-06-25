import React from 'react';

import classes from './Spinner.css';

const spinner = (props) => (
    <div className={classes.Loader}>{props.msg}</div>
);

export default spinner;