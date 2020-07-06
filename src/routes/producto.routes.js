const express=require('express')
const router =express.Router();
const Producto =  require('../models/producto')
router.get('/producto',async (req,res)=>{
    const  productos = await Producto.find()
                            .populate('categoria','descripcion');
    console.log(productos)
    res.json(productos)
   
});
router.get('/producto/:id',async (req,res)=>{
    const {id} =req.params;
    const producto = await Producto.findById(id)
    res.json(producto)
});

router.post('/producto',async(req,res)=>{
    const {nombre,descripcion,precioUni,categoria,usuario} =req.body;
  //  categoria : body.categoria
   const producto =  new Producto({nombre,descripcion,precioUni,categoria,usuario})
   await producto.save();
    res.json({status:'Usuario Saved'})
    
});
router.put('/producto/:id', async(req,res)=>{
    const {nombre,precioUni,categoria,usuario} =req.body;
    const newCategoria = {nombre,precioUni,categoria,usuario};
    const {id} =req.params;
  //  console.log(req.params.id);
    
    await Producto.findByIdAndUpdate(id,newCategoria);
    res.json({status:'Usuario update'})

});
router.delete('/producto/:id', async(req,res)=>{
  const {id} =req.params;
  await Producto.findByIdAndRemove(id)
  res.json({status:'Usuario delete'})
});


module.exports=router