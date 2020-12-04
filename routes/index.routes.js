const router = require("express").Router();
const UserModel = require("../models/User.model");
const { isAuth } = require("../middlewares/isAuth");
const { editUser } = require("../controllers/User.controller");
const {
  createProduct,
  editProduct
} = require("../controllers/Product.controller");

router.get("/", (req, res, next) => {
  res.status(200).json({ msg: "Working" });
});

/* ############################### USER ROUTES ###############################*/
router.post("/user/edit", isAuth, editUser);

/* ############################# PRODUCTS ROUTES #############################*/
router.post("/products/create", isAuth, createProduct);
router.put("/products/:productID", isAuth, editProduct);

module.exports = router;
