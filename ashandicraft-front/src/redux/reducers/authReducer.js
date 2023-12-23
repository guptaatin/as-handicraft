import { AUTH_DATA } from "../types";

// src/store/reducers/yourReducer.js
const initialState = {
    id: '',
    email: '',
    roles: '',
    auth_data: '',
    access_token: '',
    loginModelVisible: false,
    signupModelVisible: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_DATA:
            return {
                ...state,
                id: action.id,
                email: action.email,
                roles: action.roles,
                auth_data: action.auth_data,
                access_token: action.access_token,
                loginModelVisible: action.loginModelVisible,
                signupModelVisible: action.signupModelVisible
            };
        default:
            return state;
    }
};

export default authReducer;
