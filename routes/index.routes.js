const router = require("express").Router();
const UserModel = require("../models/User.model");
const { isAuth } = require("../middlewares/isAuth");
const { editUser } = require("../controllers/User.controller");
const {
  createProduct,
  editProduct,
  getAllProduct,
  getAProduct,
  deleteProduct,
  searchProduct,
} = require("../controllers/Product.controller");
const {
  getOrders,
  createOrder,
  updateOrder,
  getOrderDetails,
} = require("../controllers/orders.controller");
const {
  getSuppliers,
  createSupplier,
  getSupplierDetails,
  deleteSupplier,
  updateSupplier,
} = require("../controllers/supplier.controller");

router.get("/", (req, res, next) => {
  res.status(200).json({ msg: "Working" });
});

/* ############################### USER ROUTES ###############################*/
router.put("/user/edit", isAuth, editUser);

/* ############################# PRODUCTS ROUTES #############################*/
router.get("/products/", isAuth, getAllProduct);
router.get("/products/:productID", isAuth, getAProduct);
router.post("/products/search", isAuth, searchProduct);
router.post("/products/create", isAuth, createProduct);
router.put("/products/:productID", isAuth, editProduct);
router.delete("/products/:productID", isAuth, deleteProduct);

/* ############################## ORDERS ROUTES ##############################*/
router.get("/orders", isAuth, getOrders);
router.get("/orders/:id", isAuth, getOrderDetails);
router.post("/orders/create-order", isAuth, createOrder);
router.put("/orders/:id", isAuth, updateOrder);

/* ############################## SUPLIER ROUTES ##############################*/
router.get("/suppliers", isAuth, getSuppliers);
router.get("/suppliers/:id", isAuth, getSupplierDetails);
router.post("/suppliers/create-supplier", isAuth, createSupplier);
router.put("/suppliers/:id", isAuth, updateSupplier);
router.delete("/suppliers/:id", isAuth, deleteSupplier);

module.exports = router;
