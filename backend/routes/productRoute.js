import express from 'express';
import Product from '../models/productModel';
import { getToken } from '../util';

const router = express.Router();

router.get("/", async (req, res) => {
    const products = await Product.find({});
    res.send(products)
    console.log(products);
});

router.post("/products", async (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: req.body.numReviews
    });
    const newProduct = await product.save();
    if (newProduct) {
        return res.status(201).send({ msg: 'new Product Create', data: newProduct })
    } else {
        return res.status(500).send({ msg: 'Error in creating product' })
    }
})
export default router;