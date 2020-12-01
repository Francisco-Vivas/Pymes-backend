const { Schema, model } = require('mongoose');

const orderSchema = new Schema(
  {
    order: String,
    date: String,
    customer: String,
    total: String,
    payment: {
        type: String,
        enum: ['PENDING', 'PAID']
    },
    fulfillment: {
        type: String,
        enum: ['PENDING', 'FULFILLED']
    },
    items: Number,
    extra: String
  },
  {
    timestamps: true,
  }
);

module.exports = model('Order', orderSchema);
