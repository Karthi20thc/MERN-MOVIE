const User = require("../models/User");
const {
 verifyToken,
 verifyTokenAndAuthorization,
 verifyTokenAndAdmin,
} = require("../verifyToken");
const router = require("express").Router();

// http://localhost:5000/api/users

//  UPDATE 
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
 // 1 encrypt the user new password
 if (req.body.password) {
  req.body.password = CryptoJS.AES.encrypt(
   req.body.password,
   process.env.PASS_SEC
  ).toString();
 }

 // 2 update the user
 try {
  const updatedUser = await User.findByIdAndUpdate(
   req.params.id,
   {
    $set: req.body,
   },
   { new: true }
  );
  res.status(200).json(updatedUser);
 } catch (err) {
  res.status(500).json(err);
 }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
 try {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json("User has been deleted...");
 } catch (err) {
  res.status(500).json(err);
 }
});

// Admin only can acces the following Routes

// GET SINGLE USER 
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
 try {
  const user = await User.findById(req.params.id);
  const { password, ...others } = user._doc;
  res.status(200).json(others);
 } catch (err) {
  res.status(500).json(err);
 }
});

//GET ALL USER
router.get("/", verifyTokenAndAdmin, async (req, res) => {
 // http://localhost:5000/api/user?new=true
 const query = req.query.new;
 try {
  const users = query
   ? await User.find().sort({ _id: -1 }).limit(5)
   : await User.find();
  res.status(200).json(users);
 } catch (err) {
  res.status(500).json(err);
 }
});


// GET USER STATISTICS  To return the total number of users per month

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
 const date = new Date(); //Date Tue Apr 26 2022 15:46:42 GMT+0530 (India Standard Time)
 const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

 try {
  const data = await User.aggregate([
   { $match: { createdAt: { $gte: lastYear } } },
   {
    $project: {
     month: { $month: "$createdAt" }
    }
   },
   {
    $group: {
     _id: "$month",
     total: { $sum: 1 } // to sum every registered user
    }
   }
  ]);
  // console.log(month)
  res.status(200).json(data)
  // [
  //  {
  //   "_id": 4,   4 indicates april
  //   "total": 3  3 indicates total of 3 users in april
  //  }
  // ]
 } catch (error) { res.status(500).json(error) }

})
module.exports = router;