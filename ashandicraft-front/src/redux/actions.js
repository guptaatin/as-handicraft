import { AUTH_DATA, CART_DATA } from "./types";

const authDataAction = (id, email, roles, auth_data, access_token, loginModelVisible, signupModelVisible) => {
    return {
        type: AUTH_DATA, id, email, roles, auth_data, access_token, loginModelVisible, signupModelVisible
    };
};

const cartDataAction = (quantity_change) => {
    return {
        type: CART_DATA, quantity_change
    };
};

export { authDataAction, cartDataAction };