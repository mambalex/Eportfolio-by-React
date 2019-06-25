import React, {Component} from 'react';
import './App.css';
import {  Route, Switch, Redirect} from 'react-router-dom';
import Header from './components/Header/Header';
import Navs from './containers/Navs/Navs';
import Jobs from './containers/Jobs/Jobs';
import Candidates from './containers/Candidates/Candidates';
import Interviews from './containers/Interviews/Interviews';
import Connections from './containers/Connections/Connections';
import SideNav from './containers/Eportfolio/SideNav/SideNav';
import Eportfolio from './containers/Eportfolio/Eportfolio';
import Auth from './containers/Auth/Auth';
import { connect } from 'react-redux';
import Search from "./containers/Search/Search";
import SearchResult from "./containers/Search/SearchResult/SearchResult";


class App extends Component{
    render() {
        let routes = (
            <div>
                <Route path='/' exact component={Auth} />
                <Redirect to="/" />
            </div>
        )
        if(this.props.isAuth){
            switch (this.props.role) {
                case 'employer':
                    routes = (
                        <div>
                        <Navs />
                        <Switch>
                            <Route path='/employer/jobs' exact component={Jobs} />
                            <Route path='/employer/candidates' exact component={Candidates} />
                            <Route path='/employer/interviews' exact component={Interviews} />
                            <Route path='/search' exact component={Search} />
                            <Redirect to="/employer/jobs" />
                        </Switch>
                        </div>
                    );
                    break;
                case 'instructor':
                    routes = (
                        <div>
                            <Navs/>
                            <Switch>
                                <Route path='/instructor/jobs' exact component={Jobs} />
                                <Route path='/instructor/candidates' exact component={Candidates} />
                                <Route path='/instructor/connections' exact component={Connections} />
                                <Route path='/search' exact component={Search} />
                                <Redirect to="/instructor/jobs" />
                            </Switch>
                        </div>
                    );
                    break;
                case 'candidate':
                        routes = (
                            <div className='Eportfolio-wrapper'>
                                    <SideNav />
                                    <Eportfolio />
                            </div>
                        );
                        break;
            }
        }
        return (
                <div className="App">
                    <Header />
                    <div className='wrapper'>
                        {routes}
                    </div>
                </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        isAuth: state.auth.isAuth,
        role: state.auth.role
    }
}

export default connect(mapStateToProps)(App);
