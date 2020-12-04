const Order = require('../models/Order.model')
const User = require('../models/User.model')
const Supplier = require('../models/Supplier.model')


exports.getSuppliers = async (req, res) => {
    const { user: { id } } = req
    const user = await User.findById(id).populate('suppliersID')
    const { suppliersID } = user
    res.status(200).json(suppliersID)
}

exports.createSupplier = async (req, res) => {
    const {
        name,
        phone,
        email,
        channel,
        lastOrder
        // products???
    } = req.body
    const { user: { id, suppliersID } } = req
    const newSupplier = await Supplier.create({
        userID: id,
        name,
        phone,
        email,
        channel,
        lastOrder
        // products???
    })
    await User.findByIdAndUpdate(id, { $push: { suppliers: newSupplier._id } })
    res.status(201).json(newSupplier)
}

exports.updateSupplier = async (req, res) => {
    const { id } = req.params
    const {
        name,
        phone,
        email,
        channel,
        lastOrder
        // products???        
    } = req.body
    const updatedSupplier = await Supplier.findByIdAndUpdate(id, {
        name,
        phone,
        email,
        channel,
        lastOrder
        // products???
    }, { new: true })

        res.status(200).json(updatedSupplier)
}

exports.getSupplierDetails = async (req, res) => {
    const { id } = req.params
    const supplier = await Supplier.findById(id)

    res.status(200).json(supplier)
}

exports.deleteSupplier = async (req, res) => {
    const { id } = req.params
    await Supplier.findByIdAndDelete(id)
    res.status(200).json({ message: 'Supplier deleted' })
}