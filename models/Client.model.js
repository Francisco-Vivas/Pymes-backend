const { Schema, model } = require('mongoose')

const clientSchema = new Schema(
    {
        userID: Schema.Types.ObjectId,
        name: String,
        phone: String,
        email: String,
        address: String
    },
    {
        timestamps: true,
    }
    );

module.exports = model('Client', clientSchema);

