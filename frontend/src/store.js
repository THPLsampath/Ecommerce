import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { productDetailsReducer, productListReducer, productSaveReducer } from './reducers/productListReducer';
import { cartReducers } from './reducers/cartReducers';
import { userRegisterReducers, userSigninReducers } from './reducers/userReducers';

const cartItem = Cookie.getJSON("cartItem") || [];
const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = { cart: { cartItem }, userSignin: { userInfo } };
const reducer = combineReducers({ 
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducers,
    userSignin: userSigninReducers,
    userRegister: userRegisterReducers,
    productSave: productSaveReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));
export default store; 