const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
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
    totalAmount: { type: Number },
    price: { type: Number },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);



// const OrderSchema = new mongoose.Schema(
//   {
//     userId: { type: String, required: true },
//     products: [
//       {
//         productId: {
//           type: String,
//         },
//         quantity: {
//           type: Number,
//           default: 1,
//         },
//       },
//     ],
//     amount: { type: Number, required: true },
//     // address: { type: Object, required: true },
//     // status: { type: String, default: "pending" },
//   },
//   { timestamps: true }
// );