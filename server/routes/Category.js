const express = require('express')
const router = express.Router()
const { Category } = require("../models")
const { validateToken } = require("../middlewares/AuthMiddleware")

// OUTPUT ONE
router.get('/:CollectionId/:UserId', validateToken, async (req, res) => {
  const CollectionId = req.params.CollectionId
  const UserId = req.params.UserId

  if (UserId != req.user.id) {
    res.json({error: "Not same User."})
  } else {
    const category = await Category.findAll({ where: { CollectionId: CollectionId } })
    res.json(category);
  }
});

// INPUT
router.post("/", validateToken, async (req, res) => {
  const category = req.body;
  category.UserId = req.user.id;
  await Category.create(category);
  res.json(category);
});



//UPDATE CATEGORY NAME
router.put("/renameCategory", validateToken, async (req, res) => {
  const { newCategory, id } = req.body;
  await Category.update({ CategoryName: newCategory }, { where: { id: id } });
  res.json(newCategory);
});



// DELETE
router.delete("/:categoryId", validateToken, async (req, res) => {
  const categoryId = req.params.categoryId

  await Category.destroy({
    where: {
      id: categoryId,
    },
  });

  res.json("200: deleted successfully")
});

module.exports = router