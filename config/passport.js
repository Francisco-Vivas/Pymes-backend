const UserModel = require("../models/User.model");
const passport = require("passport");

passport.use(UserModel.createStrategy());
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

module.exports = passport;
