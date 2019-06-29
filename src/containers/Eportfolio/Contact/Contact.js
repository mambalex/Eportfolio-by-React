import React from 'react';
import { connect } from 'react-redux';
import './Contact.css';
import PropTypes from 'prop-types';
import * as actions from '../../../store/actions';


const Contact = props => (
  <div className="contact">
    <div className="title"><h2>Contact</h2></div>
    <div className="bottom">
      <div className="contact-l">
        <div className="contact-icon"><i className="far fa-envelope" /></div>
        <div className="text">Email:</div>
        <input
          className="text-2 contact-email"
          value={props.personalInfo.email}
          onChange={e => props.changePersonalInfo(e.target.value, 'email')}
        />
      </div>
      <div className="contact-l">
        <div className="contact-icon"><i className="fas fa-phone" /></div>
        <div className="text">Phone:</div>
        <input
          className="text-2 contact-phone"
          type="number"
          value={props.personalInfo.phone}
          onChange={e => props.changePersonalInfo(e.target.value, 'phone')}
        />
      </div>
      <div className="contact-l">
        <div className="contact-icon"><i className="fab fa-github" /></div>
        <div className="text">Github:</div>
        <input
          className="text-2 contact-github"
          value={props.personalInfo.link}
          onChange={e => props.changePersonalInfo(e.target.value, 'link')}
        />
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  personalInfo: state.candidate.personalInfo,
});

const mapDispatchToProps = dispatch => ({
  changePersonalInfo: (value, type) => dispatch(actions.changePersonalInfo(value, type)),
});

Contact.propTypes = {
  personalInfo: PropTypes.objectOf(PropTypes.Object),
  changePersonalInfo: PropTypes.func,
};

Contact.defaultProps = {
  personalInfo: {},
  changePersonalInfo: () => {},

};
export default connect(mapStateToProps, mapDispatchToProps)(Contact);
