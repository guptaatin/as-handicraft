import { CART_DATA } from "../types";

const initialState = {
    quantity_change: false
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CART_DATA:
            return {
                ...state,
                quantity_change: action.quantity_change,
            };
        default:
            return state;
    }
};

export default cartReducer;
