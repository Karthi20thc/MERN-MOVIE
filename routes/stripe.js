const Cart = require("../models/Cart");

const router = require("express").Router();
const KEY = process.env.STRIPE_SECRET_KEY
const stripe = require("stripe")(KEY);

// http://localhost:5000/api/checkout

// const storeItems = new Map([
//   [1, { priceInCents: 10000, name: "Learn React Today" }],
//   [2, { priceInCents: 20000, name: "Learn CSS Today" }],
// ])


router.post("/create-session", async (req, res) => {
  try {
    //1. finding the user cart
    const currentUser = req.body.userID;
    const allUserCart = await Cart.find({ userID: req.body.UserID })
    // console.log(allUserCart.length);

    // 2. create session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: allUserCart.map(item => {
        // const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "INR",

            product_data: {
              name: item.productTitle,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        }
      }),
      // customer_email: req.user.email,
      success_url: `https://floating-retreat-28847.herokuapp.com/api/order/my-orders?userId=${req.body.userID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    })

    //3. Delete the cart
    // console.log(session.payment_status);

    // if (session.payment_status === "paid") { await Cart.deleteMany({ userID: req.body.UserID }) }
    // await Cart.deleteMany({ userID: req.body.UserID }) only if the payment is success , execute this code

    res.json({
      session: session,
      currentUser: currentUser
    })
    // res.redirect(303, session.url);
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
});


module.exports = router;

// router.post("/payment", (req, res) => {
//  stripe.charges.create(
//   {
//    source: req.body.tokenId,
//    amount: req.body.amount,
//    currency: "INR"
//   },
//   (stripeError, stripeResponse) => {
//    if (stripeError) {
//     res.status(500).json(stripeError)
//    } else {
//     res.status.apply(200).json(stripeResponse)
//    }
//   }
//  )
// })