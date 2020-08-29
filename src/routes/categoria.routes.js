const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')

const Categoria = require("../models/categoria");
categoryTree = (parentId = "", docs) => {
  console.log("doc:"+docs)
 // const category = docs.filter((doc) => parentId == doc.parent);
  const  category=docs
  console.log("hi"+category)
  var categories = [];
  for (var cat of category) {
    categories.push({
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
      //children: categoryTree(cat._id, docs),
    });
  }

  return categories;
};
router.get("/categoria", async (req, res) => {
  Categoria.find({})
    .exec()
    .then((docs) => {
      console.log("docs:  " +  docs)
      const categories = categoryTree("", docs);

      res.status(201).json({
        message: categories,
      });
    })
    .catch((er) => {
      res.status(500).json({
        error: er,
      });
    });
});
// router.get("/categoria/:id", async (req, res) => {
//   const { id } = req.params;
//   const categoria = await Categoria.findById(id);
//   res.json(categoria);
// });

router.post("/categoria", async (req, res) => {
  const category = new Categoria({
    _id: new mongoose.Types.ObjectId(),

    name: req.body.name,
    slug: req.body.slug,
    parent: req.body.parent,
    createdAt: new Date()

  });

  category
    .save()
    .then((doc) => {
      res.status(201).json({
        message: doc,
      });
    })
    .catch((er) => {
      res.status(500).json({
        error: er,
      });
    });
});
router.put("/categoria/:id", async (req, res) => {
  const { descripcion, usuario } = req.body;
  const newCategoria = { descripcion, usuario };
  const { id } = req.params;
  //  console.log(req.params.id);

  await Categoria.findByIdAndUpdate(id, newCategoria);
  res.json({ status: "Usuario update" });
});
// router.delete("/categoria/:id", async (req, res) => {
//   const { id } = req.params;
//   await Categoria.findByIdAndRemove(id);
//   res.json({ status: "Usuario delete" });
// });

module.exports = router;
