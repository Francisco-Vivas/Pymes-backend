const { Schema, model } = require('mongoose');

const orderSchema = new Schema(
  {
    orderNum: String,
    date: String,
    customer: String,
    total: String,
    payment: {
        type: String,
        enum: ['PENDING', 'PAID']
    },
    fulfillment: {
        type: String,
        enum: ['PENDING', 'FULFILLED', 'CANCELLED']
    },
    items: Number,
    extra: String
  },
  {
    timestamps: true,
  }
);

module.exports = model('Order', orderSchema);
