const router = require("express").Router();
const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(KEY);

// http://localhost:5000/api/checkout

router.post("/payment", (req, res) => {
 stripe.charges.create(
  {
   source: req.body.tokenId,
   amount: req.body.amount,
   currency: "usd"
  },
  (stripeError, stripeResponse) => {
   if (stripeError) {
    res.status(500).json(stripeError)
   } else {
    res.status.apply(200).json(stripeResponse)
   }
  }
 )
})

module.exports = router;