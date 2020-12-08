const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    supplierID: {
      type: Schema.Types.ObjectId,
      ref: "Supplier",
    },
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    salePrice: {
      type: Number,
      default: 0,
    },
    wholesalePrice: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: "",
    },
    threshold: {
      type: Number,
      default: 5,
    },
    sku: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Product", productSchema);
