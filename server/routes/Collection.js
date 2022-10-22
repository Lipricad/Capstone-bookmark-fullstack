const express = require('express')
const router = express.Router()
const {Collection} = require("../models")
const { validateToken } = require("../middlewares/AuthMiddleware")

//OUTPUT ALL
router.get("/", async (req, res) => {
  const listOfCollection = await Collection.findAll()
  res.json(listOfCollection);
});


// OUTPUT BY USERID
router.get('/OutputUser',  validateToken, async (req, res) => {
  const UserId = req.user.id

  const collection = await Collection.findAll({ where: { UserId: UserId } })
  res.json(collection);
});


// OUTPUT ONE
router.get('/byId/:id', async (req, res) => {
  const id= req.params.id

  const collection = await  Collection.findByPk(id);
  res.json(collection);
})


//INPUT
router.post("/", validateToken,  async (req, res) => {
  const collection = req.body;
  collection.UserId = req.user.id;
  await Collection.create(collection);
  res.json(collection);
});


//UPDATE COLLECTION NAME
router.put("/renameCollection", validateToken, async (req, res) => {
  const { newCollection, id } = req.body;
  await Collection.update({ CollectionName: newCollection }, { where: { id: id } });
  res.json(newCollection);
});


// DELETE
router.delete("/:collectionId", validateToken, async (req, res) => {
  const collectionId = req.params.collectionId;
  await Collection.destroy({
    where: {
      id: collectionId,
    },
  });

  res.json("200: deleted successfully")
});

module.exports = router