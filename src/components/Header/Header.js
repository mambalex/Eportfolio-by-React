import React,{Component} from 'react';
import './Header.css'
import { Link} from 'react-router-dom';
import {connect} from "react-redux";
import * as actions from "../../store/actions";

class Header extends Component{

    state={
        dropDown:false
    }
    showDropDown=()=>{
        this.setState({dropDown:true})
    }
    render() {
        var dropDown=null;
        if(this.state.dropDown){
            dropDown = (<div className="dropdown-content">
                <a href="./" id='logout'>Logout</a>
            </div>)
        }
        var link = (<Link to='/search' onClick={this.props.toggleHomeSearch}>Search</Link>);
        if(this.props.searchOrHome=='Home'){link=(<Link to='/' onClick={this.props.toggleHomeSearch}>Home</Link>)}
        return(
            <nav className="header">
                <div className="home">
                    {link}
                </div>
                <div className="welcome-user">
                    Welcome,
                </div>
                <div className="user">
                    <i className="fas fa-user-alt" onClick={this.showDropDown}></i>
                    {dropDown}
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => {
    return{
        searchOrHome: state.searchResult.searchOrHome
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        toggleHomeSearch: ()=> dispatch({type:"TOGGLE HOME SEARCH"})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);