const mongoose = require('mongoose');

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
    type: Number
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

const User = mongoose.model("user", {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  }
})

const Cart = mongoose.model("Cart", {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    size : {
      type : String,
      required: true
    },
    color : {
      type : String,
      required : true
    }
  }]
})

module.exports = {
  Product,
  User,
  Cart
};


