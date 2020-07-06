const mongoose = require('mongoose');

const Schema = mongoose.Schema;
let carritoSchema = new Schema ({
    cantidad : { type :Number ,unique : true , required : [true,'la cantidad es necesaria']},
    producto : {type :Schema.Types.ObjectId,ref : 'Producto'},
    usuario : {type :Schema.Types.ObjectId,ref : 'Usuario',required:false}
})
module.exports = mongoose.model ('Carrito',carritoSchema);