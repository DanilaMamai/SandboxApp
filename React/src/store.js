import { createStore, applyMiddleware } from 'redux';
import { reducer } from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const logger = store => next => action => {
    let result;
    console.groupCollapsed("dispatching", action.type);
    console.log('prev state', store.getState());
    console.log('action', action);
    result = next(action);
    console.log('next state', store.getState());
    console.groupEnd();
    return result;
}

// const saver = store => next => action => {
//     let result = next(action)
//     localStorage['redux-store'] = JSON.stringify(store.getState())
//     return result
// }

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk, logger)));

export default store;       