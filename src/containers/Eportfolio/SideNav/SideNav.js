import React, { Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import './SideNav.css'

const changeName = {
    'Portfolio': 'portfolio',
    'Home': 'home',
    'Skill Set': 'skillset',
    'Projects': 'projects',
    'Jobs': 'jobs',
    'Contact': 'contact',
}

class SideNav extends Component {
    state = {
        'Portfolio': true,
        'Home': false,
        'Skill Set': false,
        'Projects': false,
        'Jobs': false,
        'Contact': false,
    }

    clickHandler = (e, activeNav) =>{
        let newState = {...this.state};
        Object.keys(newState).forEach((nav)=>{
            if(nav===activeNav || nav==='Portfolio'){
                newState[nav]=true;
            } else{
                newState[nav]=false;
            }
        })
        this.setState(newState)
    }


    render(){
        const li = Object.keys(this.state).map((nav, index)=>{
            if(this.state[nav]){
                return (
                    <li className='selected' key={index}><Link to={{pathname:`/candidate/${changeName[nav]}`}} onClick={(e) => this.clickHandler(e, nav)}>{nav}</Link></li>
                )
            }
            return (
                <li key={index}><Link to={{pathname:`/candidate/${changeName[nav]}`}} onClick={(e) => this.clickHandler(e, nav)}>{nav}</Link></li>
            )
        })
        var url = window.location.href.split('/').slice(-1)[0];
        if(this.props.searchOrHome==='Home'){return null}
        return (
        <div className="side-nav">
            <ul>
                {li}
            </ul>
        </div>
        )
    }

}

const mapStateToProps = state => {
    return{
        searchOrHome: state.searchResult.searchOrHome
    }
}

export default connect(mapStateToProps)(SideNav);
