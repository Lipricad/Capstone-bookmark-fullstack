const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json());
app.use(cors());

const db = require('./models')

/* ROUTERS */
const registerRouter = require("./routes/Register")
app.use("/register", registerRouter);

const collectionRouter = require("./routes/Collection")
app.use("/collection", collectionRouter);

/* TO RUN */
db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
})
// // TO DROP THE TABLE DATA THAT ALREADY EXIST
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });