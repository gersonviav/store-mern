const mongoose = require('mongoose');

const cartItemSchema = mongoose.Schema({
    
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    cart: [
        {
            id: { type: mongoose.Schema.Types.ObjectId },
            producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
            
            quantity: { type: Number, default: 1 },
            price: Number,
            total: { type: Number, default: 0 },
            nombre: { type: String, required: [true, 'El nombre es necesario'] },
            img:{
                type:String ,
                require :false}
        }
    ],
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date }
});

module.exports = mongoose.model('CartItem', cartItemSchema);