const passport = require("passport");
const UserModel = require("../models/User.model");

exports.signup = (req, res, next) => {
  UserModel.register(req.body, req.body.password)
    .then((user) => res.status(201).json({ user }))
    .catch((err) => res.status(500).json({ err }));
};

exports.login = async (req, res, next) => {
  passport.authenticate("local", (err, user, failureDetails) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Something went wrong authenticating user :c" });
    }
    if (!user) {
      return res.status(401).json(failureDetails);
    }

    req.login(user, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Something went wrong authenticating user :c" });
      }
      user.password = null;
      res.status(200).json(user);
    });
  })(req, res, next);
};

exports.currentUser = (req, res) => {
  res.json(req.user || null);
};

exports.logout = (req, res, next) => {
  req.logout();
  res.status(200).json({ msg: "Logged out. Bye, bye!" });
};

exports.googleInit = passport.authenticate("google", {
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ],
});

exports.googleCb = (req, res, next) => {
  passport.authenticate("google", (err, user, errDetails) => {
    if (err) return res.status(500).json({ err, errDetails });
    if (!user) return res.status(401).json({ err, errDetails });

    req.login(user, (err) => {
      if (err) return res.status(500).json({ err });
      return res.redirect(
        process.env.NODE_ENV === "development" ? "http://localhost:3001/" : "/"
      );
    });
  })(req, res, next);
};
