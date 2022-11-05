const express = require('express')
const router = express.Router()
const { Users } = require("../models")
const bcrypt = require("bcrypt")
const { validateToken, forgotToken } = require("../middlewares/AuthMiddleware")
var nodemailer = require('nodemailer')

const { sign } = require("jsonwebtoken")

// const JWT_SECRET = "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

//INPUT REGISTER USER
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const userEmail = await Users.findOne({ where: { email: email } });

  if (userEmail) res.json({ error: "Email already exist." })
  else
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        email: email,
        password: hash,
        role: "user"
      })
      res.json("200");
    });
});


//INPUT LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userEmail = await Users.findOne({ where: { email: email } });

  if (!userEmail) res.json({ error: "Account doesn't exist." })
  else
    bcrypt.compare(password, userEmail.password).then((match) => {
      if (!match) res.json({ error: "Incorrect Combination of Email or Password." })
      else {
        const accessToken = sign(
          { email: userEmail.email, id: userEmail.id, role: userEmail.role },
          "importantsecret"
        );
        res.json({ token: accessToken, email: email, id: userEmail.id, role: userEmail.role });
      }
    })
});


//AUTHENTICATION LOGIN
router.get('/auth', validateToken, (req, res) => {

  res.json(req.user);
})


// OUTPUT BY USERID
router.get('/userdetails', validateToken, async (req, res) => {
  const UserId = req.user.id

  const user = await Users.findAll({ where: { id: UserId } })
  res.json(user);
});


// CREATE LINK BY EMAIL
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const userEmail = await Users.findOne({ where: { email: email } });

    if (!userEmail) {
      res.json({ error: "Email doesn't exist." })
    };

    const forgotToken = sign(
      { email: userEmail.email, id: userEmail.id },
      "importantsecret", { expiresIn: "3m" }
    );
    res.json({ token: forgotToken, email: email, id: userEmail.id });

    //THIS IS THE LINK
    const link = `http://localhost:3000/reset-password/${userEmail.id}/${forgotToken}`

    //SENDING LINK TO EMAIL SENDING LINK TO EMAIL SENDING LINK TO EMAIL SENDING LINK TO EMAIL SENDING LINK TO EMAIL SENDING LINK TO EMAIL SENDING LINK TO EMAIL
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bookmarkspprt@gmail.com",
        pass: "pssfjkkewctcmeet",
      },
    });

    var mailOptions = {
      from: "bookmarkspprt@gmail.com",
      to: userEmail.email,
      subject: "Password Reset",
      text: "Hi! Dear user " + userEmail.email + ", \n\nPlease access the link before it expires in 3 minutes. \n" + link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    console.log(link)
  } catch (error) { }
});


//OUTPUT BY EMAIL FORGOT
router.get('/reset-password/:id/:forgotToken', forgotToken, async (req, res, next) => {
  const { id, forgotToken } = req.params;
  const fftoken = req.headers.forgottoken;
  const ffid = req.user.id;
  console.log(req.params);

  const userEmail = await Users.findOne({ where: { id: id } });

  if (forgotToken != fftoken || id != ffid) {
    res.json({ error: "Invalid Link Address, Please check your Email." })
  }
  else {
    res.json(userEmail)
  }
})


//CHANGE PASSWORD - FORGOT
router.put('/changepass-forgot', forgotToken, async (req, res) => {
  const { newPassword } = req.body

  bcrypt.hash(newPassword, 10).then((hash) => {
    Users.update({ password: hash }, { where: { email: req.user.email } })
    res.json("Password successfully changed.");
  });

})


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





//ADMIN PART

router.get("/authAdmin", validateToken, async (req, res) => {
  const role = req.user.role
  const checkAdmin = await Users.findOne({ where: { email: req.user.email, role: req.user.role } })

  if (role === "admin") {
    res.json(checkAdmin);
  }
  else {
    res.json({ error: "No Permission to Access" })
  }
});


//OUTPUT ALL - for ADMIN
router.get("/usersGET", validateToken, async (req, res) => {
  const listOfUser = await Users.findAll({ where: { role: "user" } })
  res.json(listOfUser);
});


//UPDATE USER ACCOUNT ADMIN PART
router.put("/:userId", validateToken, async (req, res) => {
  const { id, newPassword } = req.body;

  bcrypt.hash(newPassword, 10).then((hash) => {
    Users.update({ password: hash }, { where: { id: id } })
    res.json("Password successfully changed.");
  });

});


// DELETE ADMIN PART
router.delete("/:userId", validateToken, async (req, res) => {
  const userId = req.params.userId

  await Users.destroy({
    where: {
      id: userId,
    },
  });

  res.json("200: deleted successfully")
});



module.exports = router

