import React, { Component } from 'react';
import './Search.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchResult from './SearchResult/SearchResult';
import * as actions from '../../store/actions';


class Search extends Component {
    state = {
      input: '',
      jobOrCan: 'Can',
    }

    changeInputHandler=(e) => {
      this.setState({ input: e.target.value });
    };

    changeSelectHandler=(e) => {
      this.setState({ jobOrCan: e.target.value });
    };

    searchHandler=() => {
      let allData;
      if (this.state.jobOrCan === 'Can') {
        allData = {
          keyword: this.state.input,
          location: '',
          tags: [],
          language: null,
        };
        this.props.searchCans(allData);
      } else {
        allData = {
          salary: null,
          location: '',
          workType: null,
          tags: [],
          keyword: this.state.input,
          language: null,
        };
        this.props.searchJobs(allData);
      }
    };

    render() {
      if (this.props.allJobs || this.props.allCans) {
        return <SearchResult />;
      }
      return (
        <div className="Search">
          <div className="title">Search</div>
          <div className="search-content">
            <input
              placeholder="Job & Candidate"
              value={this.state.input}
              onChange={this.changeInputHandler}
            />
            <select name="canOrjob" onChange={this.changeSelectHandler}>
              <option value="Can">Candidates</option>
              <option value="Job">Jobs</option>
            </select>
          </div>
          <button type="button" onClick={this.searchHandler}>Search</button>
        </div>
      );
    }
}


const mapStateToProps = state => ({
  allJobs: state.searchResult.allJobs,
  allCans: state.searchResult.allCans,
});

const mapDispatchToProps = dispatch => ({
  searchCans: data => dispatch(actions.searchCans(data)),
  searchJobs: data => dispatch(actions.searchJobs(data)),
});

Search.propTypes = {
  allJobs: PropTypes.instanceOf(Array),
  allCans: PropTypes.instanceOf(Array),
  searchCans: PropTypes.func,
  searchJobs: PropTypes.func,
};

Search.defaultProps = {
  allJobs: [],
  allCans: [],
  searchCans: () => {},
  searchJobs: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
