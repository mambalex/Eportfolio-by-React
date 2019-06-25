import React, {Component} from 'react';
import Nav from '../../components/Nav/Nav';
import { withRouter } from 'react-router-dom';
import './Navs.css';
import * as actions from "../../store/actions";
import {connect} from "react-redux";

const typeStyle = {
    'Saved Jobs': {
        img:'flaticon-bag',
        backgroundColor: '#02B875',
        selectedColor: 'rgb(23,150,65)'
    },
    'Candidates': {
        img:'flaticon-resume',
        backgroundColor: 'rgb(75,193,243)',
        selectedColor: 'rgb(75,163,243)'
    },
    'Interviews': {
        img:'flaticon-businessman',
        backgroundColor: 'rgb(253,107,120)',
        selectedColor: 'rgb(250,80,100)'
            },
    'Connections': {
        img:"fas fa-bezier-curve",
        backgroundColor: 'rgb(253,107,120)',
        selectedColor: 'rgb(250,80,100)'
    }
};

const changeName = {
    'Saved Jobs': 'jobs',
    'Candidates': 'candidates',
    'Interviews': 'interviews',
    'Connections': 'connections'
}



class Navs extends Component {
    state = {
       employer : [
           {type:'Saved Jobs', isActive:true},
           {type:'Candidates', isActive:false},
           {type:'Interviews', isActive:false}
            ],
        instructor : [
            {type:'Saved Jobs', isActive:true},
            {type:'Candidates', isActive:false},
            {type:'Connections', isActive:false}
        ]
    }
    clickHandler = (type) => {
        if(this.props.fetchSuccess){
            const updateNavs = [...this.state[this.props.role]];
            for(let val of updateNavs){
                if(val.type===type){val.isActive = true}else{val.isActive=false}
            }
            this.props.history.push(`/${this.props.role}/${changeName[type]}`)
            this.setState({[this.props.role] : updateNavs})
        }
    }


    render() {
        {if(!this.props.role || this.props.role==='candidate'){return null}}
        return(
            <div className='Navs'>
                {this.state[this.props.role].map((nav,index) => {
                    let border = 'none';
                    let path = `/${this.props.role}/${changeName[nav.type]}`;
                    if(nav.isActive){border=`15px solid ${typeStyle[nav.type].selectedColor}`}
                    return <Nav
                            key={index}
                            type={nav.type}
                            path={path}
                            num={this.props[this.props.role][nav.type]}
                            img={typeStyle[nav.type].img}
                            backgroundColor={typeStyle[nav.type].backgroundColor}
                            border={border}
                            click={this.clickHandler}
                    />
                })
                }

            </div>

        )
    }
}



const mapStateToProps = state => {
    let fetchSuccess = true;
    if(!state.employer.allData && !state.instructor.allData){
        fetchSuccess = false
    }
    return{
        role: state.auth.role,
        fetchSuccess: fetchSuccess,
        employer: state.employer.navData,
        instructor: state.instructor.navData,
        hasErrored: state.employer.hasErrored,
        isLoading: state.employer.isLoading
    }
}



export default connect(mapStateToProps)(withRouter(Navs));
