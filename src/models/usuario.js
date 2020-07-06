const mongoose=require('mongoose');
const {Schema }=mongoose;
const UsuarioSchema=new Schema({
    nombre:{type:String ,required:true},
    apellido:{type:String ,required:true},
    email:{type:String ,required:true},
    password:{type:String ,required:true},
    img:{ type:String ,require :false}
})
module.exports=mongoose.model('Usuario',UsuarioSchema)
