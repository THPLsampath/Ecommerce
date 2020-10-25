import Axios from 'axios';
import Cookie from 'js-cookie';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constant/cartconstant';

const addToCart = (productId, qty) => async (dispatch, getState) => {
    try {
        const { data } = await Axios.get("/api/products/" + productId)
        dispatch({
            type: CART_ADD_ITEM, payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        })
        const { cart: { cartItem } } = getState();
        Cookie.set("cartItem", JSON.stringfy(cartItem));
    } catch (error) {

    }
}

const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });

    const { cart: { cartItem } } = getState();
    Cookie.set("cartItem", JSON.stringfy(cartItem));
}

export { addToCart, removeFromCart }