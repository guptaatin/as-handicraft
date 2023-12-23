// src/store/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer'; // Import your individual reducer(s)
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
    authPage: authReducer,
    cartPage: cartReducer
    // Add other reducers here
});

export default rootReducer;
