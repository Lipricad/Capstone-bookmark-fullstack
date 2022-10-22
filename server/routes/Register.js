const express = require('express')
const router = express.Router()
const { Users } = require("../models")
const bcrypt = require("bcrypt")
const { validateToken } = require("../middlewares/AuthMiddleware")
const jwt = require("jsonwebtoken");

const { sign } = require("jsonwebtoken")

// const JWT_SECRET =
//   "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

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
        res.json({ token: accessToken, email: email, id: userEmail.id });
      }
    })
});



//AUTHENTICATION 
router.get('/auth', validateToken, (req, res) => {

  res.json(req.email);
})

//OUTPUT ALL - for ADMIN
router.get("/", async (req, res) => {
  const listOfUser = await Users.findAll()
  res.json(listOfUser);
});

// OUTPUT BY USERID
router.get('/userdetails', validateToken, async (req, res) => {
  const UserId = req.user.id

  const user = await Users.findAll({ where: { id: UserId } })
  res.json(user);
});









// OUTPUT BY EMAIL
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const userEmail = await Users.findOne({ where: { email: email } });

    if (!userEmail) {
      return res.json({ status: "Email doesn't exist." })
    }

    const forgotToken = sign(
      { email: userEmail.email, id: userEmail.id },
      "importantsecret", { expiresIn: "5m" }
    );
    res.json({ token: forgotToken, email: email, id: userEmail.id });

    //THIS IS THE LINK
    const link = `http://localhost:3001/register/reset-password/${userEmail.id}/${forgotToken}`
    console.log(link)
  } catch (error) { }
});




//RESET PASSWORD
router.get('/reset-password/:id/:forgotToken', async (req, res, next) => {
  const { id, forgotToken } = req.params;
  console.log(req.params);

  const userEmail = await Users.findOne({ where: { id: id } });

  if (!userEmail) {
    return res.json({ status: "Email doesn't exist." })
  };

  try {
    const verify = jwt.verify(forgotToken, "importantsecret");

    req.user = verify;                                           //PARA MAKUHA KO ULIT YUNG DATA OR MAACCESS KO SA OTHER PAGES

    // res.send("Verified");
    if (verify) {
      return next();
    }

  } catch (error) { 
    return res.json({ error: err });
  }
})













// // OUTPUT BY EMAIL
// router.get('/recover', async (req, res) => {
//   const { email } = req.body;

//   const userEmail = await Users.findOne({ where: { email: email } });

//   res.json(userEmail.id);
// });



// //CHANGE PASSWORD - FORGOT
// router.put('/recoverforgotpass', async (req, res) => {
//   const { id, newPassword } = req.body

//   const userEmail = await Users.findOne({ where: { id: id } });

//   bcrypt.hash(newPassword, 10).then((hash) => {
//     Users.update({ password: hash }, { where: { id: id } })
//     res.json("Password successfully changed.");
//   });

// })












//CHANGE PASSWORD - LOGGED IN
router.put('/changepass', validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body

  const userEmail = await Users.findOne({ where: { email: req.user.email } });

  bcrypt.compare(oldPassword, userEmail.password).then((match) => {
    if (!match) res.json({ error: "Old password is incorrect. Please try again." })
    else {

      bcrypt.hash(newPassword, 10).then((hash) => {
        Users.update({ password: hash }, { where: { email: req.user.email } })
        res.json("Password successfully changed.");
      });

    }
  });

})


module.exports = router

