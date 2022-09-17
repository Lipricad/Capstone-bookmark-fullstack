const express = require('express')
const router = express.Router()
const {Collection} = require("../models")

router.get("/", async (req, res) => {
  const listOfCollection = await Collection.findAll()
  res.json(listOfCollection);
});

router.post("/", async (req, res) => {
  const post = req.body;
  await Collection.create(post);
  res.json(post);
});

module.exports = router