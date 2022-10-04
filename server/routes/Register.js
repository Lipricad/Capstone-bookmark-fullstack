const express = require('express')
const router = express.Router()
const { Users } = require("../models")
const bcrypt = require("bcrypt")

const { sign } = require("jsonwebtoken")

//INPUT REGISTER
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const userEmail = await Users.findOne({ where: { email: email } });

  if (userEmail) res.json({ error: "Email already exist." })
  else
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        email: email,
        password: hash
      })
      res.json("200");
    });
});

//INPUT LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userEmail = await Users.findOne({ where: { email: email } });

  if (!userEmail) res.json({ error: "Email doesn't exist." })
  else
    bcrypt.compare(password, userEmail.password).then((match) => {
      if (!match) res.json({ error: "Incorrect Combination of Email or Password." })
      else {
        const accessToken = sign(
          { email: userEmail.email, id: userEmail.id },
          "importantsecret"
        );
        res.json(accessToken);
      }
    })
});

module.exports = router