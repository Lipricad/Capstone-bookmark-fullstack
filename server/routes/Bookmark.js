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
router.post("/", validateToken, async (req, res) => {
  const bookmark = req.body;
  await Bookmark.create(bookmark);
  res.json(bookmark);
});







//UPDATE BOOKMARK NAME
router.put("/renameBookmark", validateToken, async (req, res) => {
  const { newBookmark, id } = req.body;
  await Bookmark.update({ BookmarkName: newBookmark }, { where: { id: id } });
  res.json(newBookmark);
});



//UPDATE CHANGE CATEGORY
router.put("/changeCategory", validateToken, async (req, res) => {
  const { newCategory, id } = req.body;
  await Bookmark.update({ CategoryId: newCategory }, { where: { id: id } });
  res.json(newCategory);
});





// DELETE
router.delete("/:bookmarkId", validateToken, async (req, res) => {
  const bookmarkId = req.params.bookmarkId

  await Bookmark.destroy({
    where: {
      id: bookmarkId,
    },
  });

  res.json("200: deleted successfully")
});

module.exports = router