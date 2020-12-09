const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    orderNum: {
      type: String,
      default: "0",
    },
    date: String,
    clientID: {
      type: Schema.Types.ObjectId,
      ref: "Client",
    },
    total: {
      type: Number,
      default: 0,
    },
    payment: {
      type: String,
      enum: ["UNPAID", "PAID"],
      default: "UNPAID",
    },
    fulfillment: {
      type: String,
      enum: ["PENDING", "FULFILLED", "CANCELLED"],
      default: "PENDING",
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    itemsQuantity: [
      {
        type: Number,
        default: 0,
      },
    ],
    itemsSalePrice: [
      {
        type: Number,
        default: 0,
      },
    ],
    itemsSubtotal: [
      {
        type: Number,
        default: 0,
      },
    ],
    extra: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Order", orderSchema);
