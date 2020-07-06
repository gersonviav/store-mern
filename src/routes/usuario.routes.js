const express=require('express')
const router =express.Router();
const Usuario =  require('../models/usuario')
router.get('/usuario',async (req,res)=>{
    const  usuarios = await Usuario.find();
    console.log(usuarios)
    res.json(usuarios)
   
});
router.get('/usuario/:id',async (req,res)=>{
    const {id} =req.params;
    const usuario = await Usuario.findById(id)
    res.json(usuario)
});

router.post('/usuario',async(req,res)=>{
    const {nombre,apellido,email,password} =req.body;
   const usuario =  new Usuario({nombre,apellido,email,password})
   await usuario.save();
    res.json({status:'Usuario Saved'})
    
});
router.put('/usuario/:id', async(req,res)=>{
    const {nombre,apellido,email,password} =req.body;
    const newUsuario = {nombre,apellido,email,password};
    const {id} =req.params;
  //  console.log(req.params.id);
    
    await Usuario.findByIdAndUpdate(id,newUsuario);
    res.json({status:'Usuario update'})

});
router.delete('/usuario/:id', async(req,res)=>{
  const {id} =req.params;
  await Usuario.findByIdAndRemove(id)
  res.json({status:'Usuario delete'})
});


module.exports=router
