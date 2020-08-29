const express = require("express");
const router = express.Router();
const Producto = require("../models/producto");
const Category = require('../models/categoria');

router.get("/producto", async (req, res) => {
  Producto.find({})
  .select('_id nombre price img slug')
  .exec()
  .then(products => {
      res.status(200).json({
          message: products
      });
  })
  .catch(er => {
      res.status(500).json({
          error: er
      });
  })
});


router.post("/producto", async (req, res) => {
  const slug = req.body.nombre.replace(/ /g, '-') +'-'+ Date.now();

  const { nombre, descripcion, price, categoria, stock} = req.body;
  //  categoria : body.categoria
  const product = new Producto({
    nombre,
    descripcion,
    price,
    categoria,
    slug,
    stock,
  });
  await product
    .save()
    .then((product) => {
      res.status(201).json({
        message: product,
      });
    })
    .catch((er) => {
      res.status(500).json({
        error: er,
      });
    });
  //  res.js on({status:'Usuario Saved'})
});
router.get('/producto/:categorySlug', (req, res) => {

  // let filter = {};
  // if(req.query.hasOwnProperty("filter")){
  //     filter['price'] = req.query.price
  // }
  
  const slug = req.params.categorySlug;
  console.log("hi"+slug)
  Category.findOne({slug: slug})
  .select('_id ')
  .exec()
  .then(category => {
      if(category){

             console.log("id:"+category._id)         
              Producto.find({categoria: category._id})
              .select('_id name price img categoria slug')
              
              .exec()
              .then(products => {
                  res.status(200).json({
                      message: products
                  })
              })
              .catch(error => {
                  return res.status(404).json({
                      message: error
                  })
              })
          

          

      }else{
          return res.status(404).json({
              message: 'Not Found a '
          })
      }
  })
  .catch(er => {
      res.status(500).json({
          error: er
      });
  });
});

router.get('/producto/:categorySlug/:productSlug', (req, res) => {

  const productSlug = req.params.productSlug;
  
  Producto.findOne({slug: productSlug})
  .exec()
  .then(product => {
      if(product){
          res.status(200).json({
              message: product
          });
      }else{
          return res.status(404).json({
              message: 'Not Founded'
          })
      }
  })
  .catch(err => {
      res.status(500).json({
          error: err
      });
  });


});









module.exports = router;
