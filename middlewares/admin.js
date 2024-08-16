const jwt = require("jsonwebtoken");

require("dotenv").config();

async function validateAdmin(req, res, next) {
  try {
    let token = req.cookies.token;
    if (!token) return res.send("you need to login first.");
    let data = await jwt.verify(token, process.env.JWT_KEY);
    req.user = data;
    next();
  } catch (err) {
    res.send(err.message);
  }
}

async function userIsLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/users/login");
}

module.exports = { validateAdmin, userIsLoggedIn };
