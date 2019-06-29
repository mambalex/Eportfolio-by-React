import React from 'react';
import PropTypes from 'prop-types';
import classes from './Job.module.css';

const Job = props => (
  <div className={classes['jobs-container']}>
    <div className={classes.top}>
      <div className={classes.title}>
        <span className={classes.dot} />
        <span className={classes['job-title']}>{props.title}</span>
        <i className="fas fa-map-marker-alt" />
        <span className={classes.location}>{props.location}</span>
      </div>
      <div className={classes.info}>
        <button type="button" onClick={e => props.click(e, props.jobInfo)}>More Info</button>
      </div>

    </div>

    <div className={classes.middle}>
      <div className={classes['middle-container']}>
        <div><i className="fas fa-users" /></div>
        <div className={classes['num-text']}>
          <div className={classes.num}>{props.candidates}</div>
          <div className={classes.text}>Candidates</div>
        </div>

      </div>
      <div className={classes['middle-container']}>
        <div><i className="flaticon-interview" /></div>
        <div className={classes['num-text']}>
          <div className={classes.num}>{props.firstInterview}</div>
          <div className={classes.text}>Interviews</div>
        </div>
      </div>
      <div className={`${classes['middle-container']} ${classes.test}`}>
        <div><i className="flaticon-test" /></div>
        <div className={classes['num-text']}>
          <div className={classes.num}>{props.test}</div>
          <div className={classes.text}>Tests</div>
        </div>
      </div>
      <div className={classes['middle-container']}>
        <div><i className="flaticon-interview" /></div>
        <div className={classes['num-text']}>
          <div className={classes.num}>{props.secondInterview}</div>
          <div className={classes.text}>2nd Interviews</div>
        </div>
      </div>
      <div className={classes['middle-container']}>
        <div><i className="flaticon-offer" /></div>
        <div className={classes['num-text']}>
          <div className={classes.num}>{props.offers}</div>
          <div className={classes.text}>Offers</div>
        </div>
      </div>

      <div className={`${classes['middle-container']} ${classes.engaged}`}>
        <div><i className="flaticon-agreement" /></div>
        <div className={classes['num-text']}>
          <div className={classes.num}>{props.engaged}</div>
          <div className={classes.text}>Engaged</div>
        </div>
      </div>

    </div>
    <div className={classes.bottom}>
      <div>
        <i className="far fa-clock" />
published on
        {' '}
        {props.date}
        {' '}
      </div>
      <div className={classes.interested}>
        <i className="fas fa-users" />
        {' '}
        {props.totalCan}
        {' '}
people interested
      </div>
    </div>
  </div>
);

Job.propTypes = {
  click: PropTypes.func,
  jobInfo: PropTypes.objectOf(PropTypes.object),
  title: PropTypes.string,
  location: PropTypes.string,
  candidates: PropTypes.number,
  firstInterview: PropTypes.number,
  test: PropTypes.number,
  secondInterview: PropTypes.number,
  offers: PropTypes.number,
  engaged: PropTypes.number,
  date: PropTypes.string,
  totalCan: PropTypes.number,
};

Job.defaultProps = {
  click: () => {},
  jobInfo: {},
  title: '',
  location: '',
  candidates: 0,
  firstInterview: 0,
  test: 0,
  secondInterview: 0,
  offers: 0,
  engaged: 0,
  date: '',
  totalCan: 0,
};

export default Job;
