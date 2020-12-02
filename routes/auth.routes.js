const router = require("express").Router();
const UserModel = require("../models/User.model");
const {
  signup,
  logout,
  login,
  currentUser,
  googleInit,
  googleCb,
} = require("../controllers/auth.controller");
const { isAuth } = require("../middlewares/isAuth");

router.post("/signup", signup);
router.get("/logout", logout);
router.post("/login", login);
router.get("/current-user", currentUser);
router.get("/google", googleInit);
router.get("/google/callback", googleCb);

router.get("/profile", isAuth, (req, res, next) => {
  UserModel.findById(req.user._id)
    .then((user) => res.status(200).json({ user }))
    .catch((err) => res.status(500).json({ err }));
});

module.exports = router;
