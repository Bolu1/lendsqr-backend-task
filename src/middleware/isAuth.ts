const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
import Jwt from "../core/Jwt";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    let decoded = Jwt.verify(token);

    res.locals.user = {
      id: decoded.id,
      accountNumber: decoded.accountNumber
    };


    next();
  } catch (err) {
    console.log(err);
    return res.status(403).json({
      status:false,
      message: "Unauthorized"
    });
  }
};

module.exports = auth;