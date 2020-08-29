const mongoose = require('mongoose')
const Schema = mongoose.Schema;
let categoriaSchema = new Schema ({
    _id: mongoose.Schema.Types.ObjectId,

    name : { type :String ,unique : true , required : [true,'la descripcion es necesaria']},
    slug: { type: String, unique: true },
    parent: { type: String },
    createdAt: Date,
    updatedAt: Date,
})
module.exports = mongoose.model ('Categoria',categoriaSchema);