const router = require('express').Router();
const express = require('express')
const {
  getOrders,
  createOrder,
  updateOrder,
  // getOrderDetails
  deleteOrder
} = require('../controllers/orders')
const { isAuth } = require('../middlewares/isAuth')

router.get('/', (req, res, next) => {
  res.status(200).json({ msg: 'Working' });
});

//------Order Routes

router.get('/orders', isAuth, getOrders)
// router.get('/orders/:orderId', isAuth, getOrderDetails)
router.post('/orders', isAuth, createOrder)
router.put('/orders/:orderId', isAuth, updateOrder)
router.delete('/orders/:orderId', isAuth, deleteOrder)



module.exports = router;
