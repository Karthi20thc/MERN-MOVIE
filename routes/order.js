const router = require("express").Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../verifyToken");

// http://localhost:5000/api/order

router.get('/my-orders', async (req, res) => {
  console.log(req.query.userId);
  const allCarts = await Cart.find({ userID: req.query.UserId })

  // const userAllOrders = new Order(...allCarts)
  // console.log(allCarts)
  const newArray = allCarts.map(function (item) {
    const newObj = {};
    newObj.language = item.language
    newObj.productImg = item.productImg
    newObj.quality = item.quality
    newObj.quantity = item.quantity
    newObj.price = item.price
    newObj.userId = item.userId
    newObj.productId = item.productId
    newObj.productTitle = item.productTitle
    newObj.totalAmount = item.price * item.quantity

    return newObj;
  });
  // console.log(newArray);
  // const allOrders = new Order(...newArray);
  try {
    // const savedOrders = await allOrders.save();
    const savedOrders = await Order.create(...newArray);
    if (savedOrders) {
      await Cart.deleteMany({ userID: req.query.UserId })
    }
    res.redirect('https://floating-retreat-28847.herokuapp.com/myOrders')
  } catch (error) { console.log(error) }
  // res.status(200).json(`hello from orders and this is the query you have sent ${req.query.hello}`)
  // res.redirect('http://127.0.0.1:3000/cart')
})

//CREATE
router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ORDERS
router.get("/find/:userId", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET MONTHLY INCOME

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1)); // previous month is the lastMonth previous. 
  // ex if today is 1 March, then lastMonth is 1 Feb, then previousMonth is 1 January.

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } }, // matching data of last 2 months from now.
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount", // here amount is the field in Order Model.
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;