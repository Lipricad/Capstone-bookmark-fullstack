const express = require('express')
const router = express.Router()
const { Bookmark } = require("../models")
const { validateToken } = require("../middlewares/AuthMiddleware")

// OUTPUT ONE
router.get('/:CategoryId', async (req, res) => {
  const CategoryId = req.params.CategoryId

  const bookmark = await Bookmark.findAll({ where: { CategoryId: CategoryId } })
  res.json(bookmark);
});

// INPUT
router.post("/", async (req, res) => {
  const bookmark = req.body;
  await Bookmark.create(bookmark);
  res.json(bookmark);
});

module.exports = router