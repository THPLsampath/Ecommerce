import express from 'express';
import data from './data';
import config from './config';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
// console.log(mongodbUrl);
const connection = mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
if (connection) {
    console.log("database is connected");
} else {
    console.log("database is not connected");
}


const app = express();

app.use("/api/users", userRoute);

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