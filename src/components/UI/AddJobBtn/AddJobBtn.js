import React from 'react';
import './AddJobBtn.css';
import PropTypes from 'prop-types';

const AddJobBtn = props => (
  <div className="add-jobs">
    <i role="presentation" className="fas fa-plus-circle fa-2x" onClick={props.click} />
  </div>
);

AddJobBtn.propTypes = {
  click: PropTypes.func,
};

AddJobBtn.defaultProps = {
  click: () => {},
};

export default AddJobBtn;
