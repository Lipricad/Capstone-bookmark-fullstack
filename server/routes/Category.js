const express = require('express')
const router = express.Router()
const { Category } = require("../models")

// OUTPUT ONE
router.get('/:CollectionId', async (req, res) => {
  const CollectionId = req.params.CollectionId

  const category = await Category.findAll({ where: { CollectionId: CollectionId } })
  res.json(category);
});

// INPUT
router.post("/", async (req, res) => {
  const post = req.body;
  await Category.create(post);
  res.json(post);
});


module.exports = router