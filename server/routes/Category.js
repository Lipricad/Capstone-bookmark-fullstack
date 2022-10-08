const express = require('express')
const router = express.Router()
const { Category } = require("../models")
const { validateToken } = require("../middlewares/AuthMiddleware")

// OUTPUT ONE
router.get('/:CollectionId', async (req, res) => {
  const CollectionId = req.params.CollectionId

  const category = await Category.findAll({ where: { CollectionId: CollectionId } })
  res.json(category);
});

// INPUT
router.post("/", validateToken, async (req, res) => {
  const category = req.body;
  await Category.create(category);
  res.json(category);
});


module.exports = router