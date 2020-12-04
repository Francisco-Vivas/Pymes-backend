const { Schema, model } = require('mongoose')

const supplierSchema = new Schema(
    {
        userID: Schema.Types.ObjectId,
        name: String,
        phone: String,
        email: String,
        channel: String,
        lastOrder: String,
        products:  [{
            type: Schema.Types.ObjectId,
            ref: 'Product'
            }]
    },
    {
        timestamps: true,
    }
    );

module.exports = model('Supplier', supplierSchema);

