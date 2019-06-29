import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './components/Header/Header';
import Navs from './containers/Navs/Navs';
import Jobs from './containers/Jobs/Jobs';
import Candidates from './containers/Candidates/Candidates';
import Interviews from './containers/Interviews/Interviews';
import Connections from './containers/Connections/Connections';
import SideNav from './containers/Eportfolio/SideNav/SideNav';
import Eportfolio from './containers/Eportfolio/Eportfolio';
import Auth from './containers/Auth/Auth';
import Search from './containers/Search/Search';

export const App = (props) => {
  let routes = (
    <div>
      <Route path="/" exact component={Auth} />
      <Redirect to="/" />
    </div>
  );
  if (props.isAuth) {
    switch (props.role) {
      case 'employer':
        routes = (
          <div>
            <Navs />
            <Switch>
              <Route path="/employer/jobs" exact component={Jobs} />
              <Route path="/employer/candidates" exact component={Candidates} />
              <Route path="/employer/interviews" exact component={Interviews} />
              <Route path="/search" exact component={Search} />
              <Redirect to="/employer/jobs" />
            </Switch>
          </div>
        );
        break;
      case 'instructor':
        routes = (
          <div>
            <Navs />
            <Switch>
              <Route path="/instructor/jobs" exact component={Jobs} />
              <Route path="/instructor/candidates" exact component={Candidates} />
              <Route path="/instructor/connections" exact component={Connections} />
              <Route path="/search" exact component={Search} />
              <Redirect to="/instructor/jobs" />
            </Switch>
          </div>
        );
        break;
      case 'candidate':
        routes = (
          <div className="Eportfolio-wrapper">
            <SideNav />
            <Eportfolio />
          </div>
        );
        break;
      default:
        break;
    }
  }
  return (
    <div className="App">
      <Header />
      <div className="wrapper">
        {routes}
      </div>
    </div>
  );
};


const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  role: state.auth.role,
});

App.propTypes = {
  isAuth: PropTypes.bool,
  role: PropTypes.string,
};

App.defaultProps = {
  isAuth: false,
  role: null,
};
export default connect(mapStateToProps)(App);
