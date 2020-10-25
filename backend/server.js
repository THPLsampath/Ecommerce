import express from 'express';
import data from './data';
import config from './config';
import dotenv from 'dotenv';
import mongoose from 'mon'

dotenv.config();

const mongodburl = config.MONGODB_URL;


const app = express();

app.get("/api/products/:id", (req, res) => {
    const porductId = req.params.id;
    const product = data.products.find(x => x._id == porductId);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ msg: "Product Not Found" })
    }
});

app.get("/api/products", (req, res) => {
    res.send(data.products);
});

app.listen(5000, () => {
    console.log("server start as port in httl://localhost:5000");
});