import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constant/cartconstant";

function cartReducers(state = { cartItem: [] }, action) {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const product = state.cartItem.find(x => x.product == item.product);
            if (product) {
                return {
                    cartItem:
                        state.cartItem.map(x => x.product == product.product ? item : x)
                };
            } else {
                return { ...state, cartItem: [...state.cartItem, item] };
            }
        case CART_REMOVE_ITEM:
            return { cartItem: state.cartItem.filter(x => x.product !== action.payload) }
        default:
            return state
    }
}

export { cartReducers }