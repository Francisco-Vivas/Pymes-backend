const router = require("express").Router();
const { isAuth, catchErrs } = require("../middlewares");
const { editUser } = require("../controllers/User.controller");
const {
  createProduct,
  editProduct,
  getAllProduct,
  getAProduct,
  deleteProduct,
  searchProduct,
  getProductsAvailable,
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
const {
  getClients,
  createClient,
  getClientDetails,
  deleteClient,
  updateClient,
} = require("../controllers/clients.controller");

router.get("/", (req, res, next) => {
  res.status(200).json({ msg: "Working" });
});

/* ############################### USER ROUTES ###############################*/
router.put("/user/edit", isAuth, catchErrs(editUser));

/* ############################# PRODUCTS ROUTES #############################*/
router.get("/products/", isAuth, catchErrs(getAllProduct));
router.get("/products/available", isAuth, catchErrs(getProductsAvailable));
router.get("/products/:productID", isAuth, catchErrs(getAProduct));
router.post("/products/search", isAuth, catchErrs(searchProduct));
router.post("/products/create", isAuth, catchErrs(createProduct));
router.put("/products/:productID", isAuth, catchErrs(editProduct));
router.delete("/products/:productID", isAuth, catchErrs(deleteProduct));

/* ############################## ORDERS ROUTES ##############################*/
router.get("/orders", isAuth, catchErrs(getOrders));
router.get("/orders/:id", isAuth, catchErrs(getOrderDetails));
router.post("/orders/create-order", isAuth, catchErrs(createOrder));
router.put("/orders/:id", isAuth, catchErrs(updateOrder));

/* ############################## SUPPLIER ROUTES ##############################*/
router.get("/suppliers", isAuth, catchErrs(getSuppliers));
router.get("/suppliers/:id", isAuth, catchErrs(getSupplierDetails));
router.post("/suppliers/create-supplier", isAuth, catchErrs(createSupplier));
router.put("/suppliers/:id", isAuth, catchErrs(updateSupplier));
router.delete("/suppliers/:id", isAuth, catchErrs(deleteSupplier));


/*############################# CLIENTS ROUTES ###############################*/
router.get("/clients", isAuth, catchErrs(getClients));
router.get("/clients/:id", isAuth, catchErrs(getClientDetails));
router.post("/clients/create-client", isAuth, catchErrs(createClient));
router.put("/clients/:id", isAuth, catchErrs(updateClient));
router.delete("/clients/:id", isAuth, catchErrs(deleteClient));

module.exports = router;
