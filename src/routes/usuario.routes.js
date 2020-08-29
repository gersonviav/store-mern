const express=require('express')
const Usuario=require('../models/usuario')
const {verificaToken,verificaAdmin_Role}=require('../middlewares/authenticacion')
const app=express()
const _=require('underscore')
const bcrypt=require('bcrypt');
app.get('/usuario',verificaToken , (req, res) =>{

    let desde=req.query.desde || 0;
    desde=Number(desde)
    let limite= req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({estado : true},'firstName email role estado google img')
            .skip(desde)
            .limit(limite)
            .exec((err,usuarios)=>{
                if (err) {
                    return res.status(400).json({
                        ok : false ,
                        err
                    })
                }
                Usuario.count({estado :true},(err,conteo)=>{
                    res.json({
                        ok:true,
                        cuantos:conteo,
                        usuarios:usuarios
                    }) 
                })
            
            })

});
//crear
app.post('/usuario', function(req, res) {

    let body = req.body;
    let usuario= new Usuario({
        firstName: body.firstName,
        lastName:body.lastName,
        email: body.email,
        password : bcrypt.hashSync(body.password,10),
        role : body.role


    })
    usuario.save((err,usuarioDB)=>{
        if (err) {
            return res.status(400).json({
                ok : false ,
                err
            })
        }
        //usuarioDB.password=null;
        res.json({
            ok:true,
            usuario : usuarioDB

        })
    })
  

});
//actualizar
app.put('/usuario/:id',[verificaToken,verificaAdmin_Role], function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body,['firstName','email','img','role','estado']);
    Usuario.findByIdAndUpdate(id ,body,{new : true ,runValidators:true} , (err,usuarioDB)=>{
        if (err) {
            return res.status(400).json({
                ok : false ,
                err
            })
        }
        res.json({
            ok:true,
            usuario:usuarioDB
        });

    })
    
});

app.delete('/usuario/:id',[verificaToken,verificaAdmin_Role], function(req, res) {
    let id =req.params.id;
//    Usuario.findByIdAndRemove(id,(err,usuarioBorrado)=>{
    let cambioEstado = {
        estado : false
    };
    Usuario.findByIdAndUpdate(id,cambioEstado,{new:true},(err,usuarioBorrado)=>{
        if (err) {
            return res.status(400).json({
                ok:false,
                err
            })
        };
        if (!usuarioBorrado){
            return res.status(400).json({
                ok:false,
                error : {
                    message: 'usuario no encontrado'
                }
                
            })
        }
        res.json({
            ok:true,
            usuario:usuarioBorrado
        })
    })
});
module.exports=app;