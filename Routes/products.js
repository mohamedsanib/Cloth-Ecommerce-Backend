const express = require('express');
const Router = express.Router();
const {Product} = require('../db');

Router.get("/allproduct", async (req, res) => {
    let product = await Product.find({});
    res.json(product);
});
  
Router.post("/product-id", async(req, res) => {
    let product = await Product.find({
        _id : req.body.id
    });
    res.json(product);
})

module.exports = Router;