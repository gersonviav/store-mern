const express = require("express");
const app = express();
const CardItem = require("../models/cardItem");
const Order = require('../models/order');
app.post("/order", async (req, res) => {
  const order = new Order({
    
    user: req.body.user,
    order: req.body.order,
    address: req.body.address,
    paymentType: req.body.paymentType,
    paymentStatus: req.body.paymentStatus
});
  
  //console.log(quantity);


  await order.save();
  console.log(order);
  res.json({ status: "Carditem Saved" });
});
app.get('/getorders/:userId', async (req, res) => {

  const userId = req.params.userId;
  const order= await Order.find({"user": userId})
  .select('address order orderDate paymentType paymentStatus isOrderCompleted')
  .populate('order.producto', 'nombre precioUni')
  .exec() 
  console.log(order);
  res.json(order);
});
module.exports =app;