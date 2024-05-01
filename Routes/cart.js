const express = require('express');
const Router = express.Router();
const cors = require('cors');

const {Authentication} = require('../middleware/authentication');
const {User, Cart, Product} = require('../db');

// Router.use(cors());

Router.post('/addItem', Authentication, async(req, res)=>{
    const cart = await Cart.findOne({
        userId : req.UserId
    });

    let contain = false;
    cart.products.forEach((item)=>{
        if(item.productId.toString() === req.body.productId){
            contain = true;
            return;
        }
    })

    if(contain === true){
        return res.json({
            msg : false
        })
    }

    const newCartItem = {
        productId : req.body.productId,
        size : req.body.size,
        color : req.body.color,
        quantity : req.body.quantity
    }

    cart.products.push(newCartItem);
    await cart.save();

    res.json({
        msg : true
    })
})

Router.get('/getItems', Authentication, async(req, res)=>{

    const cart = await Cart.findOne({
        userId : req.UserId
    });

    res.json({
        cartItems : cart.products
    })
})

Router.post('/removeItem', Authentication, async(req, res)=>{
    const cart = await Cart.findOneAndUpdate(
        { userId: req.UserId },
        { $pull: { products: { productId: req.body.productId } } },
        { new: true }
    );
    
    res.json({
        msg : cart
    })
})


module.exports = Router;
