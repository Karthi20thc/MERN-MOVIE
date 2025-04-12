const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")
const stripeRoute = require("./routes/stripe");
const path = require("path");



// Database connection
mongoose.connect(process.env.MONGO_URL, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
}).then(() => { console.log("Database connection successful") }).catch((error) => console.log(error));

// mounting middleware
app.use(cors());
app.use(express.json());
// http://localhost:5000
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/cart", cartRoute)
app.use("/api/order", orderRoute)
app.use("/api/checkout", stripeRoute)

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});



// starting the server
const port = process.env.PORT || 9000;
const server = app.listen(port, () => {
 console.log(`Backend server is running on ${port}`);
});
// server.close();