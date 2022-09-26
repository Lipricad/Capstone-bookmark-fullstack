const express = require('express')
const router = express.Router()
const {Collection} = require("../models")

//OUTPUT ALL
router.get("/", async (req, res) => {
  const listOfCollection = await Collection.findAll()
  res.json(listOfCollection);
});


// OUTPUT ONE
router.get('/byId/:id', async (req, res) => {
  const id= req.params.id

  const collection = await  Collection.findByPk(id);
  res.json(collection);
})


//INPUT
router.post("/", async (req, res) => {
  const post = req.body;
  await Collection.create(post);
  res.json(post);
});

module.exports = router