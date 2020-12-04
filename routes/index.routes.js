const router = require('express').Router();
const express = require('express')
const {
  getOrders,
  createOrder,
  updateOrder,
  getOrderDetails
} = require('../controllers/orders')
const { isAuth } = require('../middlewares/isAuth')

router.get('/', (req, res, next) => {
  res.status(200).json({ msg: 'Working' });
});

//------Order Routes

router.get('/orders', isAuth, getOrders)
router.get('/orders/:id', isAuth, getOrderDetails)
router.post('/orders/create-order', isAuth, createOrder)
router.put('/orders/:id', isAuth, updateOrder)


module.exports = router;
