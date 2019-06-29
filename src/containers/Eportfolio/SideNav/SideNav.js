import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './SideNav.css';
import PropTypes from 'prop-types';
import uuid from 'uuid';


const changeName = {
  Portfolio: 'portfolio',
  Home: 'home',
  'Skill Set': 'skillset',
  Projects: 'projects',
  Jobs: 'jobs',
  Contact: 'contact',
};

class SideNav extends Component {
    state = {
      Portfolio: true,
      Home: false,
      'Skill Set': false,
      Projects: false,
      Jobs: false,
      Contact: false,
    }

    clickHandler = (e, activeNav) => {
      const newState = { ...this.state };
      Object.keys(newState).forEach((nav) => {
        if (nav === activeNav || nav === 'Portfolio') {
          newState[nav] = true;
        } else {
          newState[nav] = false;
        }
      });
      this.setState(newState);
    }


    render() {
      const li = Object.keys(this.state).map((nav) => {
        if (this.state[nav]) {
          return (
            <li className="selected" key={uuid.v4()}><Link to={{ pathname: `/candidate/${changeName[nav]}` }} onClick={e => this.clickHandler(e, nav)}>{nav}</Link></li>
          );
        }
        return (
          <li key={uuid.v4()}><Link to={{ pathname: `/candidate/${changeName[nav]}` }} onClick={e => this.clickHandler(e, nav)}>{nav}</Link></li>
        );
      });
      if (this.props.searchOrHome === 'Home') { return null; }
      return (
        <div className="side-nav">
          <ul>
            {li}
          </ul>
        </div>
      );
    }
}

const mapStateToProps = state => ({
  searchOrHome: state.searchResult.searchOrHome,
});

SideNav.propTypes = {
  searchOrHome: PropTypes.string,
};

SideNav.defaultProps = {
  searchOrHome: 'Search',
};

export default connect(mapStateToProps)(SideNav);
