import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProducts, saveProduct } from '../action/productaction';


function ProductsScreen(props) {
    const [modelVisible, setModelVisible] = useState(false)
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');

    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;

    const productSave = useSelector(state => state.productSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = productSave;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts());
        return () => {
            //
        }
    }, []);

    const openModal = (product) => {
        setModelVisible(true);
        setId(product._id);
        setName(product.name);
        setImage(product.image);
        setPrice(product.price);
        setDescription(product.description);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        // console.log(1234);
        dispatch(saveProduct({
            _id: id,
            name, price, image, brand, category, countInStock, description
        }));
    };


    // console.log(products);
    if (!products) {
        return <div><h1>loading...</h1></div>
    } else {
        return loading ? <div>loading...</div> :
            error ? <div>{error}</div> :
                < div className="content content-margined" >
                    <div className="product-header">
                        <h3>Products List</h3>
                        <button onClick={() => openModal({})}>Create Product</button>
                    </div>

                    {modelVisible && <div className="from">
                        <form onSubmit={handleSubmit}>
                            <ul className="from-container">
                                <li>
                                    <h2>Create Product</h2>
                                </li>
                                <li>
                                    {loadingSave && <div>Loading...</div>}
                                    {errorSave && <div>{errorSave}</div>}
                                </li>
                                <li>
                                    <label htmlFor="name">
                                        Name
                                    </label>
                                    <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                                </li>
                                <li>
                                    <label htmlFor="name">
                                        Price
                                    </label>
                                    <input type="text" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)}></input>
                                </li>
                                <li>
                                    <label htmlFor="name">
                                        Image
                                    </label>
                                    <input type="text" name="image" id="image" value={image} onChange={(e) => setImage(e.target.value)}></input>
                                </li>
                                <li>
                                    <label htmlFor="name">
                                        Brand
                                    </label>
                                    <input type="text" name="brand" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)}></input>
                                </li>
                                <li>
                                    <label htmlFor="name">
                                        Count In Stock
                                    </label>
                                    <input type="text" name="countinstock" id="countinstock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></input>
                                </li>
                                <li>
                                    <label htmlFor="name">
                                        Category
                                    </label>
                                    <input type="text" name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}></input>
                                </li>
                                <li>
                                    <label htmlFor="name">
                                        Description
                                    </label>
                                    <textarea type="text" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                </li>
                                <li>
                                    <button type="submit" className="button primary">Creating</button>
                                </li>
                                <li>
                                    <button type="button" onClick={() => setModelVisible(false)} className="button secondary">Back</button>
                                </li>
                            </ul>
                        </form>
                    </div>}



                    <div className="product-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>CATEGARY</th>
                                    <th>BRAND</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product =>
                                    <tr>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>
                                        <td>
                                            <button onClick={() => openModal(product)}>Edit</button>
                                            <button>Delete</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
    }
}

export default ProductsScreen;
