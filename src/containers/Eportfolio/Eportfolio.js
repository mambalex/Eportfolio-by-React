import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Eportfolio.css';
import PropTypes from 'prop-types';
import Portfolio from './Portfolio/Portfolio';
import Home from './Home/Home';
import SKillSet from './SkillSet/SkillSet';
import Projects from './Projects/Projects';
import PortfolioJobs from './PortfolioJobs/PortfolioJobs';
import Contact from './Contact/Contact';
import * as actions from '../../store/actions';
import Search from '../Search/Search';


class Eportfolio extends Component {
  componentDidMount() {
    if (!this.props.candidateData) { this.props.fetchCandidateData(); }
  }

  render() {
    if (this.props.isLoading) { return <div className="content"><p>Loading Candidate data...</p></div>; }
    if (this.props.hasError) { return <div className="content"><p>Sorry! There was an error loading the data</p></div>; }
    return (
      <div className="content">
        <Switch>
          <Route path="/candidate" exact component={Portfolio} />
          <Route path="/candidate/home" exact component={Home} />
          <Route path="/candidate/skillset" exact component={SKillSet} />
          <Route path="/candidate/projects" exact component={Projects} />
          <Route path="/candidate/jobs" exact component={PortfolioJobs} />
          <Route path="/candidate/contact" exact component={Contact} />
          <Route path="/search" exact component={Search} />
          <Redirect to="/candidate" />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  candidateData: state.candidate.allData,
  hasError: state.candidate.hasErrored,
  isLoading: state.candidate.isLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchCandidateData: () => dispatch(actions.fetchCandidateData()),
});

Eportfolio.propTypes = {
  candidateData: PropTypes.objectOf(PropTypes.object),
  hasError: PropTypes.string,
  isLoading: PropTypes.string,
  fetchCandidateData: PropTypes.func,
};

Eportfolio.defaultProps = {
  candidateData: {},
  hasError: '',
  isLoading: '',
  fetchCandidateData: () => {},

};

export default connect(mapStateToProps, mapDispatchToProps)(Eportfolio);
