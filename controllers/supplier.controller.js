const User = require("../models/User.model");
const Supplier = require("../models/Supplier.model");
const ProductModel = require("../models/Product.model");

exports.getSuppliers = async (req, res) => {
  const {
    user: { _id },
  } = req;
  const user = await User.findById(_id).populate("suppliersID");
  const { suppliersID } = user;
  res.status(200).json(suppliersID);
};

exports.createSupplier = async (req, res) => {
  const { name, phone, email, channel, lastOrder, products } = req.body;
  const {
    user: { id },
  } = req;
  const newSupplier = await Supplier.create({
    userID: id,
    name,
    phone,
    email,
    channel,
    lastOrder,
    products,
  });
  await User.findByIdAndUpdate(id, { $push: { suppliersID: newSupplier._id } });

  for (let product of products) {
    let updatedProduct = await ProductModel.findByIdAndUpdate(
      product,
      {
        supplierID: newSupplier._id,
      },
      { new: true }
    );
    console.log(updatedProduct);
  }

  res.status(201).json(newSupplier);
};

exports.updateSupplier = async (req, res) => {
  const { id } = req.params;
  const { name, phone, email, channel, lastOrder, products } = req.body;
  const updatedSupplier = await Supplier.findByIdAndUpdate(
    id,
    {
      name,
      phone,
      email,
      channel,
      lastOrder,
      products,
    },
    { new: true }
  );

  for (let product of products) {
    await ProductModel.findByIdAndUpdate(product, {
      supplierID: newSupplier._id,
    });
  }

  res.status(200).json(updatedSupplier);
};

exports.getSupplierDetails = async (req, res) => {
  const { id } = req.params;
  const supplier = await Supplier.findById(id).populate("products");

  res.status(200).json(supplier);
};

exports.deleteSupplier = async (req, res) => {
  const { id } = req.params;
  await Supplier.findByIdAndDelete(id);
  res.status(200).json({ message: "Supplier deleted" });
};
