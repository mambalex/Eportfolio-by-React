import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import './Auth.css'
import { updateObject, checkValidity } from '../../utility/utility';

class Auth extends Component {
    state = {
        controls: {
            email: {
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        signup_username:'',
        signup_password:'',
        signup_email:'',
        signup_userType:'',
        isLogin: true,
        frontBoxClass:'frontbox',
        loginClass:'login',
        loginMsgClass:'loginMsg',
        signupClass:'signup hide',
        signupMsgClass:'signupMsg invisible'

    }

    // componentDidMount () {
    //         this.props.onSetAuthRedirectPath();
    //
    // }
    signupChange=(e,type)=>{
        this.setState({[type]:e.target.value})
    };
    signup=()=>{
        this.props.signup(this.state.signup_username,this.state.signup_email,this.state.signup_password,this.state.signup_userType);
    }

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = updateObject( this.state.controls, {
            [controlName]: updateObject( this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            } )
        } );
        this.setState( { controls: updatedControls } );
    }

    submitHandler = ( event ) => {
        event.preventDefault();
        this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value );
    }

    switchAuthModeHandler = () => {
        if(this.state.isLogin){
            this.setState({
                controls:{email:{value:''},password: {value:''}},
                frontBoxClass:'frontbox moving',
                loginClass:'login hide',
                loginMsgClass:'loginMsg invisible',
                signupClass:'signup',
                signupMsgClass:'signupMsg',
                isLogin: false
            })
        }else{
            this.setState({
                frontBoxClass:'frontbox',
                loginClass:'login',
                loginMsgClass:'loginMsg',
                signupClass:'signup hide',
                signupMsgClass:'signupMsg invisible',
                isLogin: true
            })
        }
    }

    render () {
        if ( this.props.loading ) {
            return <Spinner msg='Logging in...'/>
        }

        let errorMessage = null;

        if ( this.props.error ) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if ( this.props.isAuthenticated ) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className="container">
                {authRedirect}
                <div className="backbox">
                    <div className={this.state.loginMsgClass}>
                        <div className="textcontent">
                            <p className="title">Don't have an account?</p>
                            <p>Sign up to start your journey.</p>
                            <button id="switch1" onClick={this.switchAuthModeHandler}>Sign Up</button>
                        </div>
                    </div>
                    <div className={this.state.signupMsgClass}>
                        <div className="textcontent">
                            <p className="title">Have an account?</p>
                            <p>Log in to see all your collection.</p>
                            <button id="switch2" onClick={this.switchAuthModeHandler}>LOG IN</button>
                        </div>
                    </div>
                </div>


                <div className={this.state.frontBoxClass}>
                    <form className={this.state.loginClass}>
                        <h2>LOG IN</h2>
                        <div className="inputbox">
                            <div className="input-icon">
                                <i className="fas fa-user"></i>
                                <input
                                    type="text"
                                    name="email"
                                    id="login-username"
                                    placeholder="USERNAME"
                                    value={this.state.controls.email.value}
                                    onChange={(event,controlName )=>this.inputChangedHandler(event,'email')}
                                />
                            </div>
                            <div className="input-icon">
                                <i className="fas fa-lock"></i>
                                <input
                                    type="password"
                                    name="password"
                                    id="login-password"
                                    placeholder="PASSWORD"
                                    value={this.state.controls.password.value}
                                    onChange={(event,controlName )=>this.inputChangedHandler(event,'password')}
                                />
                            </div>
                        </div>

                        <button type="button" onClick={this.submitHandler}>LOG IN</button>
                    </form>

                    <form className={this.state.signupClass}>
                        <h2>SIGN UP</h2>
                        <div className="inputbox">
                            <div className="input-icon">
                                <i className="fas fa-user-alt"></i>
                                <input type="text"
                                       id='signup-username' name="fullname" placeholder="USERNAME"
                                       value={this.state.signup_username}
                                       onChange={(e)=>this.signupChange(e,'signup_username')}
                                />
                            </div>
                            <div className="input-icon">
                                <i className="fas fa-envelope"></i>
                                <input type="text" id='signup-email' name="email" placeholder="EMAIL"
                                       value={this.state.signup_email}
                                       onChange={(e)=>this.signupChange(e,'signup_email')}
                                />
                            </div>
                            <div className="input-icon">
                                <i className="fas fa-lock"></i>
                                <input type="password" id='signup-password' name="password" placeholder="PASSWORD"
                                       value={this.state.signup_password}
                                       onChange={(e)=>this.signupChange(e,'signup_password')}
                                />
                            </div>
                            <select name="user-type" id="user-type" placeholder="USER TYPE"
                                    value={this.state.signup_userType}
                                    onChange={(e)=>this.signupChange(e,'signup_userType')}
                            >
                                <option value="" hidden>USER TYPE</option>
                                <option value="candidate">CANDIDATE</option>
                                <option value="employer">EMPLOYER</option>
                                <option value="instructor">INSTRUCTOR</option>
                            </select>
                        </div>
                        <button
                            type="button"
                             id='signup-btn'
                             onClick={this.signup}
                        >SIGN UP</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        // buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password) => dispatch( actions.auth( email, password ) ),
        signup: ( username, email, password, userType) => dispatch( actions.signup(username, email, password, userType) ),
        onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/employer' ) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Auth );

// export default Auth;