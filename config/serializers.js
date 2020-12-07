const passport = require("passport");
const UserModel = require("../models/User.model");

passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  UserModel.findById(userIdFromSession)
    .then((user) => cb(null, user))
    .catch((err) => cb(err));
});
