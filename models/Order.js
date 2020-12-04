const { Schema, model } = require('mongoose');

const orderSchema = new Schema(
  {
    userID: Schema.Types.ObjectId,
    orderNum: String,
    date: String,
    customer: String,
    total: String,
    payment: {
        type: String,
        enum: ['UNPAID', 'PAID']
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
