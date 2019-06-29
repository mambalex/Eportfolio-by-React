import React from 'react';
import PropTypes from 'prop-types';
import classes from './Spinner.css';


const spinner = props => (
  <div className={classes.Loader}>{props.msg}</div>
);

spinner.propTypes = {
  msg: PropTypes.string,
};

spinner.defaultProps = {
  msg: '',
};

export default spinner;
