const jwt = require("jsonwebtoken");

// middlewares

const verifyToken = (request, response, next) => {
 const authHeader = request.headers.token;
 // 1 if authHeader is true Verify token
 if (authHeader) {
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SEC, (error, user) => {
   // if user is true, set the user to the request object
   if (error) return response.status(401).json("Token is not valid")
   request.user = user;
   next();
  })
 }
 else {
  return response.status(401).json("You are not authenticated!");
 }
}

// if user Id coming from the Jwt token from client, which is found to be true(by verifyToken), then Authorize the client.(i,e simply pass through the next middleware in the stack.)

const verifyTokenAndAuthorization = (request, response, next) => {
 verifyToken(request, response, () => {
  // console.log(request.user.id, request.params.id)
  if (request.user.id === request.params.id || request.user.isAdmin) {
   next();
  } else {
   response.status(403).json(" You are not Authorized ")
  }
 })
}

const verifyTokenAndAdmin = (request, response, next) => {
 verifyToken(request, response, () => {
  if (request.user.isAdmin) {
   next();
  } else {
   response.status(403).json("You are not alowed to do that!");
  }
 });
};

module.exports = {
 verifyToken,
 verifyTokenAndAuthorization,
 verifyTokenAndAdmin,
};