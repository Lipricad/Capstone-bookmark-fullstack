const express = require('express')
const router = express.Router()
const {Collection} = require("../models")

router.get("/", async (req, res) => {
  const listOfCollection = await Collection.findAll()
  res.json(listOfCollection);
});


// SEARCH COLLECTION
router.get('/byId/:id', async (req, res) => {
  const id= req.params.id

  const collection = await  Collection.findByPk(id);
  res.json(collection);
})
// SEARCH COLLECTION ENDS HERE

router.post("/", async (req, res) => {
  const post = req.body;
  await Collection.create(post);
  res.json(post);
});

module.exports = router