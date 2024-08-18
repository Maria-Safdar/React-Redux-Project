// store.js
// import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
// import rootReducer from './reducer';
// import { thunk,  } from 'redux-thunk';
// // Import thunk correctly

// const middlewares = [thunk];

// const reducer = combineReducers({
//   book: rootReducer,
// });

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(
//   reducer,
//   composeEnhancers(applyMiddleware(...middlewares))
// );

// export default store;

//working on store..


// store.js
import { createStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk'; // Fix the import statement
import rootReducer from './reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;



