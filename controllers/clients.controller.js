const User = require('../models/User.model')
const Client = require('../models/Client.model')


exports.getClients = async (req, res) => {
    const { user: { _id } } = req
    const user = await User.findById(_id).populate('clientsID')
    const { clientsID } = user
    res.status(200).json(clientsID)
}

exports.createClient = async (req, res) => {
    const {
        name,
        phone,
        email,
        address
    } = req.body
    const { user: { id, clientsID } } = req
    const newClient = await Client.create({
        userID: id,
        name,
        phone,
        email,
        address
    })
    await User.findByIdAndUpdate(id, { $push: { clientsID: newClient._id } })
    res.status(201).json(newClient)
}

exports.updateClient = async (req, res) => {
    const { id } = req.params
    const {
        name,
        phone,
        email,
        address     
    } = req.body
    const updatedClient = await Client.findByIdAndUpdate(id, {
        name,
        phone,
        email,
        address
    }, { new: true })

        res.status(200).json(updatedClient)
}

exports.getClientDetails = async (req, res) => {
    const { id } = req.params
    const client = await Client.findById(id)

    res.status(200).json(client)
}

exports.deleteClient = async (req, res) => {
    const { id } = req.params
    await Client.findByIdAndDelete(id)
    res.status(200).json({ message: 'Client deleted' })
}