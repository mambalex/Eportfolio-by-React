import React from 'react';
import PropTypes from 'prop-types';


const Connection = props => (
  <li className="connection-item">
    <div className="can-job-link">
      <div className="job">
        <div className="title">{props.jobName}</div>
        <div className="info saved">
          <button type="button" onClick={e => props.jobClick(e, props.jobId)}>More info</button>
        </div>
      </div>
      <div className="link"><i className="fas fa-link" /></div>
      <div className="candidate">
        <div className="title">{props.canName}</div>
        <div className="candidate-info saved">
          <button type="button" onClick={e => props.canClick(e, props.canId)}>More info</button>
        </div>
      </div>
    </div>
  </li>
);

Connection.propTypes = {
  jobName: PropTypes.string,
  jobClick: PropTypes.func,
  canName: PropTypes.string,
  jobId: PropTypes.string,
  canClick: PropTypes.func,
  canId: PropTypes.string,
};

Connection.defaultProps = {
  jobName: '',
  jobClick: () => {},
  canName: '',
  jobId: '',
  canClick: () => {},
  canId: '',
};

export default Connection;
