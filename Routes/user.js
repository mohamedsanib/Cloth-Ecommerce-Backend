const express = require('express');
const Router = express.Router();
const {User, Cart} = require('../db'); 

const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');

Router.post('/SignUP', async(req, res)=>{
    const existed = await User.findOne({
        email : req.body.email
    });

    if(existed){
        return res.json({
            msg : "Existing User",
        })
    }

    const newUser = await User.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    });
    const UserId = newUser._id;

    const newCart = await Cart.create({
        userId : UserId
    });

    const token = jwt.sign({
        UserId : UserId
    }, JWT_SECRET);

    res.json({
        msg : true,
        token : token
    })
});

Router.post('/signIn', async (req, res)=>{
    const existed = await User.findOne({
        email : req.body.email,
        password : req.body.password
    })

    if(existed){
        const token = jwt.sign({
            UserId : existed._id
        }, JWT_SECRET);

        return res.json({
            msg : true,
            token : token
        })
        
    }

    res.json({
        msg : "Invalid email/Password"
    })
})

module.exports = Router;