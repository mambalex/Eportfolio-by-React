import React, {Component} from 'react';
import { connect } from 'react-redux';
import './Contact.css';
import * as actions from "../../../store/actions";


class Contact extends Component {


    render() {
        return(
            <div className="contact">
                <div className="title"><h2>Contact</h2></div>
                <div className="bottom">
                    <div className="contact-l">
                        <div className="contact-icon"><i className="far fa-envelope"></i></div>
                        <div className="text">Email:</div>
                        <input className="text-2 contact-email"
                                value={this.props.personalInfo.email}
                                onChange={(e)=>this.props.changePersonalInfo(e.target.value,'email')}
                        />
                    </div>
                    <div className="contact-l">
                        <div className="contact-icon"><i className="fas fa-phone"></i></div>
                        <div className="text">Phone:</div>
                        <input className="text-2 contact-phone"
                               type='number'
                               value={this.props.personalInfo.phone}
                               onChange={(e)=>this.props.changePersonalInfo(e.target.value, 'phone')}
                        />
                    </div>
                    <div className="contact-l">
                        <div className="contact-icon"><i className="fab fa-github"></i></div>
                        <div className="text">Github:</div>
                        <input className="text-2 contact-github"
                               value={this.props.personalInfo.link}
                               onChange={(e)=>this.props.changePersonalInfo(e.target.value, 'link')}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        personalInfo : state.candidate.personalInfo
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        changePersonalInfo:(value, type)=> dispatch(actions.changePersonalInfo(value, type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);