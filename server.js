const express = require('express');
const app = express();

const cors = require('cors');
app.use(express.json())
app.use(cors());

const productRoute = require('./Routes/products');
app.use('/product', productRoute);

const UserRoute = require('./Routes/user');
app.use('/user', UserRoute);

const CartRoute = require('./Routes/cart');
app.use('/cart', CartRoute);


app.listen(3000, ()=>{
    console.log("server running....");
})