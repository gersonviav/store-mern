const express = require("express");
const router = express.Router();
const CardItem = require("../models/cardItem");
//const { populate } = require('../models/carrito');
router.get("/carditem", async (req, res) => {
  const carritos = await CardItem.find()
          
        

 
  console.log(carritos);
  res.json(carritos);
});
router.get("/carditem/:id", async (req, res) => {
    
    const {id} =req.params;
    const carrito = await CardItem.findById(id)
    
    console.log(carrito);
    res.json(carrito);
  });
  
  router.delete('/carditem/:id', async(req,res)=>{
    const {id} =req.params;
    await CardItem.findByIdAndRemove(id)
    res.json({status:'Cart delete'})
  });
  
router.post("/carditem", async (req, res) => {
  const { usuario, cart } = req.body;
  const { price, quantity } = cart;
  
  //console.log(quantity);

  //console.log(price);
  //  categoria : body.categoria
  const cardItem = new CardItem({ usuario, cart });
 // console.log(cardItem['cart'][0].quantity)
 // console.log(cardItem['cart'][0].price)
  t=cardItem['cart'][0].quantity*cardItem['cart'][0].price
  console.log("total es : "+t)
  cardItem['cart'][0].total=t
  await cardItem.save();
  console.log(cardItem);
  res.json({ status: "Carditem Saved" });
});

module.exports = router;
