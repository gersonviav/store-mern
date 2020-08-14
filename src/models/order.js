const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    order: [
        {
            producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
            price: { type: Number, required: true},
            quantity: Number
        }
    ],
    // address: { type: mongoose.Schema.Types.ObjectId, ref: 'UserAddress' },
    orderDate: { type: Date, default: Date.now() },
    paymentType: String,
    paymentStatus: String,
    isOrderCompleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Order', orderSchema);