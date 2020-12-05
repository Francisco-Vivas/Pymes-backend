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
    payment: {
      type: String,
      enum: ["PENDING", "PAID"],
      default: "PENDING",
    },
    fulfillment: {
      type: String,
      enum: ["PENDING", "FULFILLED", "CANCELLED"],
      default: "PENDING",
    },
    items: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
    date: String,
    extra: String,
    customer: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Order", orderSchema);
