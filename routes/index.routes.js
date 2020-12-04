const router = require('express').Router();
const express = require('express')
const {
  getOrders,
  createOrder,
  updateOrder,
  getOrderDetails
} = require('../controllers/orders.controller')
const {
  getSuppliers,
  createSupplier,
  getSupplierDetails,
  deleteSupplier,
  updateSupplier
} = require('../controllers/supplier.controller')
const { isAuth } = require('../middlewares/isAuth')

router.get('/', (req, res, next) => {
  res.status(200).json({ msg: 'Working' });
});

//------Order Routes

router.get('/orders', isAuth, getOrders)
router.get('/orders/:id', isAuth, getOrderDetails)
router.post('/orders/create-order', isAuth, createOrder)
router.put('/orders/:id', isAuth, updateOrder)


//------Supplier Routes

router.get('/suppliers', isAuth, getSuppliers)
router.get('/suppliers/:id', isAuth, getSupplierDetails)
router.post('/suppliers/create-supplier', isAuth, createSupplier)
router.put('/suppliers/:id', isAuth, updateSupplier)
router.delete('/suppliers/:id', isAuth, deleteSupplier)


module.exports = router;
