const ProductModel = require("../models/Product.model");
const UserModel = require("../models/User.model");

function diacriticSensitiveRegexV2(string = "") {
  return new RegExp(
    string
      .split(" ")
      .join("|")
      .replace(/a|á|à|ä/g, "[a,á,à,ä]")
      .replace(/e|é|ë/g, "[e,é,ë]")
      .replace(/i|í|ï/g, "[i,í,ï]")
      .replace(/o|ó|ö|ò/g, "[o,ó,ö,ò]")
      .replace(/u|ü|ú|ù/g, "[u,ü,ú,ù]")
  );
}

const getAllProductValues = (req) => {
  const {
    name,
    quantity,
    salePrice,
    wholesale,
    image,
    threshold,
    sku,
    supplierID,
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
    ...{ supplierID: supplierID || req.user._id },
  };
};

exports.getAllProduct = async (req, res) => {
  const user = await UserModel.findById(req.user._id).populate("productsID");
  const { productsID } = user;
  res.status(200).json(productsID);
};

exports.getAProduct = async (req, res) => {
  const { productID } = req.params;

  const product = await ProductModel.findById(productID).populate("supplierID");

  res.status(200).json(product);
};

exports.createProduct = async (req, res) => {
  const productValues = getAllProductValues(req);

  const newProduct = await ProductModel.create(productValues);

  await UserModel.findByIdAndUpdate(req.user._id, {
    $push: { productsID: newProduct._id },
  });

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
  const { productID } = req.params;
  const deletedProduct = await ProductModel.findByIdAndDelete(productID);
  res.status(200).json(deletedProduct);
};

exports.searchProduct = async (req, res) => {
  const { searchString, hasQuantity } = req.body;
  const regSearch = diacriticSensitiveRegexV2(searchString);

  const userProducts = await UserModel.findById(req.user._id).populate(
    "productsID"
  );

  const products = userProducts.productsID.filter(
    (product) =>
      regSearch.test(product.name.toLowerCase()) &&
      (hasQuantity ? product.quantity > 0 : true)
  );

  res.status(200).json(products);
};

exports.getProductsAvailable = async (req, res) => {
  const { productsID } = await UserModel.findById(req.user._id).populate(
    "productsID"
  );
  const productsAvailable = productsID.filter((e) => e.quantity);
  res.status(200).json(productsAvailable);
};
