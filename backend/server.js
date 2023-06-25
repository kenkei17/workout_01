require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const cors = require("cors");
//middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
//Routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

//Chaining method
/* mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Listening to Port 4000");
    });
    console.log("CoNNECTED to the database");
  })
  .catch((e) => {
    console.log(e, "There's an errorrrrr!!!!");
  });
 */

//async function method

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(process.env.PORT);
    console.log("Listening to Port 4000");
    console.log("CoNNECTED to the database");
  } catch (e) {
    console.log(e, "There's an errorrrrr!!!!");
  }
};
startServer();

module.exports = app;
