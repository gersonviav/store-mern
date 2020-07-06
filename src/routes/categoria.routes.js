const express=require('express')
const router =express.Router();
const Categoria =  require('../models/categoria')
router.get('/categoria',async (req,res)=>{
    const  categorias = await Categoria.find();
    console.log(categorias)
    res.json(categorias)
   
});
router.get('/categoria/:id',async (req,res)=>{
    const {id} =req.params;
    const categoria = await Categoria.findById(id)
    res.json(categoria)
});

router.post('/categoria',async(req,res)=>{
    const {descripcion,usuario} =req.body;
  //  categoria : body.categoria
   const categoria =  new Categoria({descripcion,usuario})
   await categoria.save();
    res.json({status:'Usuario Saved'})
    
});
router.put('/categoria/:id', async(req,res)=>{
    const {descripcion,usuario} =req.body;
    const newCategoria = {descripcion,usuario};
    const {id} =req.params;
  //  console.log(req.params.id);
    
    await Categoria.findByIdAndUpdate(id,newCategoria);
    res.json({status:'Usuario update'})

});
router.delete('/categoria/:id', async(req,res)=>{
  const {id} =req.params;
  await Categoria.findByIdAndRemove(id)
  res.json({status:'Usuario delete'})
});


module.exports=router