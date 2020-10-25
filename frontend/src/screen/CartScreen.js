import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../action/cartaction';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CART_ADD_ITEM } from '../constant/cartconstant';

function CartScreen(props) {
    const cart = useSelector(state => state.cart);
    const { cartItem } = cart;
    const productId = props.match.params.id;
    console.log(productId);
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    const dispatch = useDispatch();

    const removeFromCarthandaler = (productId) => {
        dispatch(removeFromCart(productId));
    }

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
        return () => {
            //
        }
    }, []);

    const checkouthandaler = () => {
        props.history.push("/signin?redirect=shipping");
    }


    return <div className="cart">
        <div className="cart-list">
            <ul className="cart-list-container">
                <li>
                    <h3>
                        Shopping Cart
                    </h3>
                    <div>
                        Price
                    </div>
                </li>

                {
                    cartItem.length == 0 ?
                        <div>
                            caet is empty!
                    </div>
                        :
                        cartItem.map(item =>
                            <li>
                                <div className="cart-image">
                                    <img src={item.image} alt="product" />
                                </div>
                                <div className="cart-name">
                                    <div>
                                        <Link to={"/product/" + item.product}>
                                            {item.name}
                                        </Link>
                                    </div>
                                    <div>
                                        Qty :
                                        <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                        <button type="button" className="button" onClick={() => removeFromCarthandaler(item.product)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <div className="cart-price">
                                    ${item.price}
                                </div>
                            </li>
                        )
                }

            </ul>
        </div>
        <div className="cart-action">
            <h3>
                Subtotal ({cartItem.reduce((a, c) => a + c.qty, 0)} items)
            :
            $ {cartItem.reduce((a, c) => a + c.price * c.qty, 0)}
            </h3>
            <button onClick={checkouthandaler} className="button primary" disabled={cartItem.length == 0}>
                Proceed to Checkout
            </button>
        </div>
    </div>
}

export default CartScreen;