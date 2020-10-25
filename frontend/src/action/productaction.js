import axios from 'axios';
const { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PORDUCT_LIST_FAIL, PORDUCT_DETAILS_REQUEST, PORDUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL } = require("../constant/porductconstant")

 
const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { data } = await axios.get("/api/products");
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PORDUCT_LIST_FAIL, payload: error.message });
    }
}

const detailsPeoduct = (productId) => async (dispatch) => {
    try {
        dispatch({ type: PORDUCT_DETAILS_REQUEST, payload: productId });
        const { data } = await axios.get("/api/products/" + productId);
        dispatch({ type: PORDUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
    }
}

export { listProducts, detailsPeoduct }