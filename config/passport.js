const UserModel = require("../models/User.model");
const passport = require("passport");

require("./serializers");
passport.use(UserModel.createStrategy());
require("./googleStrategy");

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
};
