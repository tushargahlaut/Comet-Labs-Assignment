const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.js");
const dotenv  = require("dotenv");
dotenv.config();
const secret = process.env.JWT_SEC;

module.exports = async function isAdmin(req, res, next) {
    //fetch the token from headers
    const token = req.headers.token;
    if(!token){
        res.send(401, "Unauthorized, Admin access required");
    }
    let decodedData;
    //decode the JWT Token and fetch UserId
    decodedData = jwt.verify(token, secret);
    req.userId = decodedData?.id;
    //Fetch user by user Id
    const user = await UserModel.findById(req.userId);
    if (token && user.role=="admin") {
      next();
    } else {
      // return unauthorized
      res.send(401, "Unauthorized, Admin access required");
    }
  };