import React, {Component} from 'react';
import Nav from '../../components/Nav/Nav';
import { withRouter } from 'react-router-dom';
import './Search.css';
import SearchResult from "./SearchResult/SearchResult";
import * as actions from "../../store/actions";
import {connect} from "react-redux";


class Search extends Component {
    state = {
        input:'',
        jobOrCan: 'Can'
    }
    changeInputHandler=(e)=>{
        this.setState({input:e.target.value})
    };
    changeSelectHandler=(e)=>{
        this.setState({jobOrCan:e.target.value})
    };

    searchHandler=(e)=>{
        var allData;
        if(this.state.jobOrCan==='Can'){
            allData={
                'keyword':  this.state.input,
                'location': '',
                'tags':    [],
                'language': null
            }
            this.props.searchCans(allData);
        }else{
            allData={
                'salary': null,
                'location': '',
                'workType': null,
                'tags':   [],
                'keyword':this.state.input,
                'language': null
            }
            this.props.searchJobs(allData);
        }
        console.log(this.state.input, this.state.jobOrCan)
    };

    render() {
        if(this.props.allJobs || this.props.allCans){
            console.log('search com')
            return <SearchResult />
        }
        return(
            <div className='Search'>
                <div className='title'>Search</div>
                <div className='search-content'>
                <input placeholder='Job & Candidate'
                       value={this.state.input}
                       onChange={this.changeInputHandler}
                />
                    <select name="canOrjob" onChange={this.changeSelectHandler}>
                        <option value="Can">Candidates</option>
                        <option value="Job">Jobs</option>
                    </select>
                </div>
                <button onClick={this.searchHandler}>Search</button>
            </div>
        )
    }
}



const mapStateToProps = state => {
    return{
        allJobs: state.searchResult.allJobs,
        allCans: state.searchResult.allCans
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        searchCans: (data) => dispatch(actions.searchCans(data)),
        searchJobs: (data) => dispatch(actions.searchJobs(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Search);

