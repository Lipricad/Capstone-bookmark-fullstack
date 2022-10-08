const express = require('express')
const router = express.Router()
const {Collection} = require("../models")
const { validateToken } = require("../middlewares/AuthMiddleware")

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
router.post("/", validateToken,  async (req, res) => {
  const collection = req.body;
  await Collection.create(collection);
  res.json(collection);
});

module.exports = router