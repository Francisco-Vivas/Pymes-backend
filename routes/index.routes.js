<<<<<<< HEAD
const router = require("express").Router();
const UserModel = require("../models/User.model");
const { isAuth } = require("../middlewares/isAuth");
const { editUser } = require("../controllers/User.controller");
const {
  createProduct,
  editProduct
} = require("../controllers/Product.controller");
const {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder
} = require('../controllers/orders')
const { isAuth } = require('../middlewares/isAuth')

router.get("/", (req, res, next) => {
  res.status(200).json({ msg: "Working" });
});

/* ############################### USER ROUTES ###############################*/
router.post("/user/edit", isAuth, editUser);

/* ############################# PRODUCTS ROUTES #############################*/
router.post("/products/create", isAuth, createProduct);
router.put("/products/:productID", isAuth, editProduct);

/* ############################## ORDERS ROUTES ##############################*/
router.get('/orders', isAuth, getOrders)
// router.get('/orders/:orderId', isAuth, getOrderDetails)
router.post('/orders/create-order', isAuth, createOrder)
router.put('/orders/:orderId', isAuth, updateOrder)
// router.delete('/orders/:orderId', isAuth, deleteOrder)



module.exports = router;
