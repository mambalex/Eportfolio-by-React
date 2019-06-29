import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  createStore, applyMiddleware, compose, combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import * as serviceWorker from './serviceWorker';
import authReducer from './store/reducer/auth';
import employerReducer from './store/reducer/employer';
import instructorReducer from './store/reducer/instructor';
import candidateReducer from './store/reducer/candidate';
import searchResultReducer from './store/reducer/searchResult';

const rootReducer = combineReducers({
  employer: employerReducer,
  instructor: instructorReducer,
  candidate: candidateReducer,
  searchResult: searchResultReducer,
  auth: authReducer,
});

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunk),
));
// const store = createStore(
//     rootReducer,
//     applyMiddleware(thunk)
// );


ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
