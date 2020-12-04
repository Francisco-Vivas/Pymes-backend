const Order = require('../models/Order')
const User = require('../models/User.model')

exports.getOrders = async (req, res) => {
    const { user: { id } } = req
    const user = await User.findById(id).populate('ordersID')
    const { ordersID } = user
    res.status(200).json(ordersID)
}

exports.createOrder = async (req, res) => {
    const {
        date,
        customer,
        total,
        payment,
        fulfillment,
        items,
        extra
    } = req.body
    const { user: { id, ordersID } } = req
    const newOrder = await Order.create({
        userID: id,
        orderNum: ordersID.length + 1,
        date,
        customer,
        total,
        payment,
        fulfillment,
        items,
        extra
    })
    await User.findByIdAndUpdate(id, { $push: { ordersID: newOrder._id } })
    res.status(201).json(newOrder)
}

exports.updateOrder = async (req, res) => {
    const { orderId } = req.params
    const {
        date,
        customer,
        total,
        payment,
        fulfillment,
        items,
        extra        
    } = req.body
    console.log(orderId)
    const updatedOrder = await Order.findByIdAndUpdate(orderId, {
        date,
        customer,
        total,
        payment,
        fulfillment,
        items,
        extra
    }, { new: true })

        res.status(200).json(updatedOrder)
}

// exports.getOrderDetails