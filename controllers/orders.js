const Order = require('../models/Order')
const User = require('../models/User.model')

exports.getOrders = async (req, res) => {
    const { user: { id } } = req
    const { orders } = await User.findById(id).populate('orders')

    res.status(200).json(orders)
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

    const { user: { id, facturaID } } = req
    const newOrder = await Order.create({
        orderNum: facturaID.length + 1,
        date,
        customer,
        total,
        payment,
        fulfillment,
        items,
        extra
    })

    await User.findByIdAndUpdate(is, { $push: { facturaID: newOrder._id } })

    res.status(201).json(newOrder)
}

exports.updateOrder = async (req, res) => {
    const { orderID } = req.params
    const {
        orderNum,
        date,
        customer,
        total,
        payment,
        fulfillment,
        items,
        extra        
    } = req.body

    const updatedOrder = await Order.findByIdAndUpdate(orderId, {
        orderNum,
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

exports.deleteOrder = async (req, res) => {
    const { orderId } = req.params
    await Order.findByIdAndDelete(orderId)
    res.status(200).json({ message: 'Order deleted'})
}
// exports.getOrderDetails