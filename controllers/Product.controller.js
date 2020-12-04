const ProductModel = require("../models/Product.model");

const getAllProductValues = req => {
  const {
    name,
    quantity,
    salePrice,
    wholesale,
    image,
    threshold,
    sku,
    supplierID
  } = req.body;

  return {
    userID: req.user._id,
    name,
    quantity,
    salePrice,
    wholesale,
    image,
    threshold,
    sku,
    ...{ supplierID: supplierID || req.user._id }
  };
};

exports.getAllProduct = async (req, res) => {
  const products = UserModel.findById(req.user._id);
};

exports.createProduct = async (req, res) => {
  const productValues = getAllProductValues(req);
  console.log(productValues);
  const newProduct = await ProductModel.create(productValues);

  res.status(201).json(newProduct);
};

exports.editProduct = async (req, res) => {
  const { productID } = req.params;
  const productValues = getAllProductValues(req);

  const updatedProduct = await ProductModel.findByIdAndUpdate(
    productID,
    productValues,
    { new: true }
  );

  res.status(200).json(updatedProduct);
};

exports.deleteProduct = async (req, res) => {
  const { productID } = req.paramas;

  const deletedProduct = await ProductModel.findByIdAndDelete(productID);

  req.status(200).json(deletedProduct);
};
