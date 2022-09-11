const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json());
app.use(cors());

const db = require('./models')

/* ROUTERS */
const registerRouter = require("./routes/Register")
app.use("/register", registerRouter);

/* TO RUN */
db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
})
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });