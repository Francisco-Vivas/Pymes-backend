const router = require("express").Router();
const { editUser } = require("../controllers/User.controller");
const { isAuth } = require("../middlewares/isAuth");
const UserModel = require("../models/User.model");

router.post("/edit", isAuth, editUser);

module.exports = router;
