const express = require("express");
const app = express();
const router = require("./routes/project.route");
const userRouter = require("./routes/user.route");
const boardRouter = require("./routes/board.route");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const middleware = require("./middleware/verifyToken");

// Connecting mongoDB
let PORT = process.env.PORT || 8000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`connected to db and listening on port`, PORT);
    });
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err.reason);
  });

app.get("/", (req, res) => {
  res.send("hello world");
});
app.use(express.json());
app.use(cors());
// app.use("/projects", middleware, router);
app.use("/projects", router);
app.use("/boards", middleware, boardRouter);
app.use("/auth", userRouter);
app.use(bodyParser.json());
