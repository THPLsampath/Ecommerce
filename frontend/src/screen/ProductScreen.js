import React, { useEffect, useState } from 'react';
import data from '../data';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { detailsPeoduct } from '../action/productaction';

function ProductScreen(props) {
    console.log(props.match.params.id);

    const [qty, setQty] = useState(1);

    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsPeoduct(props.match.params.id));
        return () => {
            //
        }
    }, [])

    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
    }

    return <div>
        <div className="back-to-result">
            <Link to="/">Back to result</Link>
        </div>
        {
            loading ? <div><h1>Loading...</h1></div> :
                error ? <div>{error}</div> :
                    (
                        <div className="details">
                            <div className="details-image">
                                <img src={product.image} alt="product"></img>
                            </div>
                            <div className="details-info">
                                <ul>
                                    <li><h4>{product.name}</h4></li>
                                    <li>{product.rating} Star {product.numReviews}</li>
                                    <li>Price: <b>${product.price}</b></li>
                                    <li>Descripation:<div>{product.discripation}</div></li>
                                </ul>
                            </div>
                            <div className="details-action">
                                <ul>
                                    <li>Price: {product.price}</li>
                                    <li>
                                        Status: {product.status}
                                        Status: {product.countInStock > 0 ? "in Stock" : "no Stock"}
                                    </li>
                                    <li>Qty: <select value={qty} onChange={(e) => { setQty(e.target.value) }} >
                                        {
                                            [...Array(product.countInStock).keys()].map(x =>
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            )
                                        }
                                    </select>
                                    </li>
                                    <li>
                                        {product.countInStock > 0 ? <button onClick={handleAddToCart} className="button">Add To Card</button> : <div>Out of stock</div>}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )
        }

    </div>
}

export default ProductScreen;