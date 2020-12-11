const { Schema, model } = require("mongoose");

const supplierSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: String,
    email: {
      type: String,
      default: "",
    },
    channel: String,
    lastOrder: String,
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Supplier", supplierSchema);
