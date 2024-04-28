const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

app.use(express.json())
app.use(cors());

mongoose.connect(
    "mongodb+srv://admin:Admin@cluster0.xtt1tac.mongodb.net/Ecommerce"
);

const Product = mongoose.model("product", {
    name: {
      type: String,
      required: true,
    },
    discription: {
      type: String,
      required: true
    },
    image: {
      type: [String],
      required: true,
    },
    color: {
      type: [String],
      required: true,
    },
    size: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type : Number
    },
    date: {
      type: Date,
      default: Date.now,
    },
    available: {
      type: Boolean,
      default: true,
    },
  });

  // const Cart = mongoose.model("cart", {
  //   product_id : {
  //     type : String,
  //     required : true,
  //   }
  // });

  // app.get("/Cart", async(req, res)=>{
  //   let cartitems = await Product.find({});
  //   res.json(cartitems);
  // })

  // app.post("/addToCart", async(req, res)=>{
  //   const newItem = new Cart({
  //     product_id : req.body.id
  //   });
  //   await newItem.save();

  //   res.json({
  //     product : newItem
  //   })
  // });

app.get("/allproduct", async (req, res) => {
    let product = await Product.find({});
    res.json(product);
});
  
app.post("/product-id", async(req, res) => {
    let product = await Product.find({
        _id : req.body.id
    });
    res.json(product);
})

app.listen(3000, ()=>{
    console.log("server running....");
})