const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    order_id: { type: String, required: true },
    restroId: { type: Number, required: true },
    order_status: {type: String, required: true},
    order_type: { type: String, required: true },
    created_At: { type: Date, default: Date.now },
    address: {
        name: { type: String, required: true },
        number: { type: Number, required: true },
        streetAddress: { type: String, required: true },
        postalCode: { type: Number, required: true }
    },
    items: [
        {
            id: { type: Number, required: true },
            name: { type: String, required: true },
            description: { type: String },
            image: { type: String },
            price: { type: Number, required: true },
            count: { type: Number, required: true }
        }
    ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
