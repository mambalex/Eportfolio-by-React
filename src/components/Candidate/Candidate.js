import React from 'react';
import PropTypes from 'prop-types';
import classes from './Candidate.module.css';


const Candidate = (props) => {
  let savedCanStyle = '';
  if (props.canType === 'Saved candidate') {
    savedCanStyle = classes.savedCan;
  }

  return (
    <div className={classes['candidates-container']} style={{ display: 'flex' }}>
      <div className={classes.top}>
        <div className={classes.name}>
          <span><i className="fas fa-user-alt" /></span>
          <span>{props.canInfo.name}</span>
          <i className="fas fa-map-marker-alt" />
          <span className={classes.location}>{props.canInfo.location}</span>
        </div>
        {/* <div className={classes['id']}>{props.id}</div> */}
        {/* <div className={classes["interviewId"]}>{props.interviewId}</div> */}
        <div className={classes['candidate-info']}>
          <button type="button" onClick={event => props.click(event, props.canInfo, props.canType)}>More Info</button>
        </div>
      </div>
      <div className={classes.middle}>
        <img src={props.image} alt="user portrait" />
        <div className={classes['profile-icon']}>
          <i className="fas fa-address-card fa fa-2x" />
        </div>
        <div className={classes.profile}>
          {' '}
          {props.canInfo.about_me}
          {' '}
        </div>
      </div>

      <div className={classes.bottom}>
        <div className={classes['job-name']}>
          <div className={`${savedCanStyle} ${classes['job-tag']}`}>
            <span><i className="fas fa-briefcase" /></span>
            <span>
Applying for
              {props.canInfo.job_name}
            </span>
          </div>
        </div>
        <div className={classes['job-tag']}>
          <i className="fas fa-user-alt canType" />
          {props.canType}
        </div>

      </div>
    </div>
  );
};

Candidate.propTypes = {
  canInfo: PropTypes.objectOf(PropTypes.object),
  canType: PropTypes.string,
  click: PropTypes.func,
  image: PropTypes.string,
};

Candidate.defaultProps = {
  canInfo: {},
  canType: '',
  click: () => {},
  image: '',
};

export default Candidate;
