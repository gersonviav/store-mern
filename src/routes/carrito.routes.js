const express=require('express')
const router =express.Router();
const Carrito =  require('../models/carrito');
const { populate } = require('../models/carrito');
router.get('/carrito',async (req,res)=>{
    const  carritos = await Carrito.find()
                            .populate('producto','precioUni')
                            .populate('usuario','email');
    console.log(carritos)
    res.json(carritos)
   
});
router.get('/carrito/:id',async (req,res)=>{
    const {id} =req.params;
    const carrito = await Carrito.findById(id)
    res.json(carrito)
});

router.post('/carrito',async(req,res)=>{
    const {cantidad,producto,usuario} =req.body;
  //  categoria : body.categoria
   const carrito =  new Carrito({cantidad,producto,usuario})
   await carrito.save();
    res.json({status:'Usuario Saved'})
    
});
router.put('/carrito/:id', async(req,res)=>{
    const {cantidad,producto,usuario} =req.body;
    const newCarrito = {cantidad,producto,usuario};
    const {id} =req.params;
  //  console.log(req.params.id);
    
    await Carrito.findByIdAndUpdate(id,newCarrito);
    res.json({status:'Usuario update'})

});
router.delete('/carrito/:id', async(req,res)=>{
  const {id} =req.params;
  await Carrito.findByIdAndRemove(id)
  res.json({status:'Usuario delete'})
});


module.exports=router