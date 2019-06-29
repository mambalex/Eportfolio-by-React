import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class Header extends Component {
    state={
      dropDown: false,
    }

    showDropDown=() => {
      this.setState({ dropDown: true });
    }

    render() {
      let dropDown = null;
      if (this.state.dropDown) {
        dropDown = (
          <div className="dropdown-content">
            <a href="./" id="logout">Logout</a>
          </div>
        );
      }
      let link = (<Link to="/search" onClick={this.props.toggleHomeSearch}>Search</Link>);
      if (this.props.searchOrHome === 'Home') { link = (<Link to="/" onClick={this.props.toggleHomeSearch}>Home</Link>); }
      return (
        <nav className="header">
          <div className="home">
            {link}
          </div>
          <div className="welcome-user">
                    Welcome,
          </div>
          <div className="user">
            <i role="presentation" className="fas fa-user-alt" onClick={this.showDropDown} />
            {dropDown}
          </div>
        </nav>
      );
    }
}

const mapStateToProps = state => ({
  searchOrHome: state.searchResult.searchOrHome,
});

const mapDispatchToProps = dispatch => ({
  toggleHomeSearch: () => dispatch({ type: 'TOGGLE HOME SEARCH' }),
});


Header.propTypes = {
  toggleHomeSearch: PropTypes.func,
  searchOrHome: PropTypes.string,
};

Header.defaultProps = {
  toggleHomeSearch: () => {},
  searchOrHome: 'Search',
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
