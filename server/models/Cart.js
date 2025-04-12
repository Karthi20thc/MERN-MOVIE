const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    productId: {
      type: String,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    language: { type: String },
    quality: { type: String },
    productImg: { type: String },
    productTitle: { type: String },
    productYear: { type: String },
    productRunTime: { type: String },
    desc: { type: String },
    price: { type: Number },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);

// products: [
//  {
//   productId: {
//    type: String,
//   },
//   quantity: {
//    type: Number,
//    default: 1,
//   },
//  },
// ],