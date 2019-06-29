import React from 'react';
import './Nav.css';
import PropTypes from 'prop-types';


const Nav = props => (
  <div
    className="Nav"
    role="presentation"
    style={{
      backgroundColor: props.backgroundColor,
      borderBottom: props.border,
    }}
    onClick={() => props.click(props.type)}
  >
    <div className="icons">
      <i className={props.img} />
    </div>
    <div className="title-num">
      <div className="num">{props.num}</div>
      <div className="title">{props.type}</div>
    </div>
  </div>
);

Nav.propTypes = {
  backgroundColor: PropTypes.string,
  border: PropTypes.string,
  click: PropTypes.string,
  type: PropTypes.string,
  img: PropTypes.string,
  num: PropTypes.number,
};

Nav.defaultProps = {
  backgroundColor: 'white',
  border: '',
  click: () => {},
  type: '',
  img: '',
  num: 0,
};


export default Nav;
