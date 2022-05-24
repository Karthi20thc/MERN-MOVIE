const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


// http://localhost:5000/api/auth

// Register a user
router.post("/register", async (req, res) => {
 const newUser = new User({
  username: req.body.username,
  email: req.body.email,
  password: CryptoJS.AES.encrypt(
   req.body.password,
   process.env.PASS_SEC
  ).toString(),
 })

 try {
  const savedUser = await newUser.save();
  res.status(201).json(savedUser);
 } catch (err) {
  res.status(500).json(err);
 }
})

// Login a user
router.post("/login", async (req, res) => {
 try {
  // 1 find the user
  const user = await User.findOne(
   {
    username: req.body.username
   }
  );
  if (user === null) {
   return res.status(401).json(`No User found`)
  }

  // 2 decrypt the user password in the db for comparison
  const hashedPassword = CryptoJS.AES.decrypt(
   user.password,
   process.env.PASS_SEC
  );
  const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

  // 3 
  const inputPassword = req.body.password;

  // console.log(!user, originalPassword, inputPassword)
  // console.log(user && (originalPassword === inputPassword))

  // 4 if user is true, but entered wrong password, if both user and password is true, execute the else
  if (user && originalPassword != inputPassword) {
   res.status(401).json("Wrong password")
  }
  else {
   // 5 if the username and password right, sign the jwt token
   const accessToken = jwt.sign(
    {
     id: user._id,
     isAdmin: user.isAdmin,
    },
    process.env.JWT_SEC,
    { expiresIn: "100d" }
   );

   // send the response
   const { password, ...others } = user._doc;
   res.status(200).json({ ...others, accessToken });
   // console.log(user._doc, accessToken)
  }

 } catch (error) { res.status(500).json(error) }
})

module.exports = router;