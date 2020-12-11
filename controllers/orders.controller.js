const Order = require("../models/Order.model");
const ProductModel = require("../models/Product.model");
const User = require("../models/User.model");

async function productsToItems(productsList) {
  let items = [],
    itemsQuantity = [],
    itemsSalePrice = [],
    itemsSubtotal = [];
  for (let product of productsList) {
    const searchProduct = await ProductModel.findById(product._id);
    items.push(product._id);
    itemsQuantity.push(product.quantity);
    itemsSalePrice.push(product.salePrice);
    itemsSubtotal.push(product.quantity * product.salePrice);
    await ProductModel.findByIdAndUpdate(product._id, {
      quantity: searchProduct.quantity - product.quantity,
    });
  }
  return { items, itemsQuantity, itemsSalePrice, itemsSubtotal };
}

exports.getOrders = async (req, res) => {
  const {
    user: { id },
  } = req;
  const user = await User.findById(id).populate({
    path: "ordersID",
    populate: { path: "clientID" },
  });
  const { ordersID } = user;
  res.status(200).json(ordersID);
};

exports.createOrder = async (req, res) => {
  const {
    date,
    clientID,
    total,
    payment,
    fulfillment,
    extra,
    productsList,
  } = req.body;

  const {
    user: { id, ordersID },
  } = req;

  const {
    items,
    itemsQuantity,
    itemsSalePrice,
    itemsSubtotal,
  } = await productsToItems(productsList);

  const newOrder = await Order.create({
    userID: id,
    orderNum: ordersID.length + 1,
    date,
    clientID,
    total,
    payment,
    fulfillment,
    extra,
    items,
    itemsQuantity,
    itemsSalePrice,
    itemsSubtotal,
  });

  await User.findByIdAndUpdate(id, { $push: { ordersID: newOrder._id } });
  res.status(201).json(newOrder);
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const {
    date,
    clientID,
    total,
    payment,
    fulfillment,
    extra,
    productsList,
  } = req.body;

  const {
    items,
    itemsQuantity,
    itemsSalePrice,
    itemsSubtotal,
  } = await productsToItems(productsList);

  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    {
      date,
      clientID,
      total,
      payment,
      fulfillment,
      extra,
      items,
      itemsQuantity,
      itemsSalePrice,
      itemsSubtotal,
    },
    { new: true }
  );

  res.status(200).json(updatedOrder);
};

exports.getOrderDetails = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id).populate("items").populate("clientID");

  res.status(200).json(order);
};
