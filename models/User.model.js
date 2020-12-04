const { Schema, model } = require("mongoose");
const PLM = require("passport-local-mongoose");

const userSchema = new Schema(
  {
    userType: {
      type: String,
      enum: ["USER", "CLIENT", "SUPPLIER"],
      default: "USER",
    },
    companyName: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      required: true,
      default: "",
    },
    userlastname: {
      type: String,
      required: true,
      default: "",
    },
    email: {
      type: String,
      required: true,
      default: "",
      unique: true,
    },
    password: {
      type: String,
      default: "",
    },
    googleID: {
      type: String,
      default: "",
    },
    cellphone: {
      type: String,
      default: "",
    },
    prefix: {
      type: String,
      default: "+57",
    },
    clienteID: [{
      type: Schema.Types.ObjectId,
    }],
    proveedorID: [{
      type: Schema.Types.ObjectId,
      ref: 'Supplier'
    }],
    ordersID:  [{
      type: Schema.Types.ObjectId,
      ref: 'Order'
    }],
    location: { type: String, default: "" },
    address: { type: String, default: "" },
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.plugin(PLM, { usernameField: "email" });

module.exports = model("User", userSchema);
