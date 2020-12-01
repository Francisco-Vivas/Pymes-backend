const express = require("express");
const router = express.Router();
const UserModel = require("../models/User.model");
const passport = require("../config/passport");
const { singup, logout } = require("../controllers/auth.controller");
const { isAuth } = require("../middlewares/isAuth");

router.post("/signup", singup);
router.get("/logout", logout);

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  const { user } = req;
  res.status(200).json({ user });
});

router.get("/profile", isAuth, (req, res, next) => {
  UserModel.findById(req.user._id)
    .then((user) => res.status(200).json({ user }))
    .catch((err) => res.status(500).json({ err }));
});

module.exports = router;
