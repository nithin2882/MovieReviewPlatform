const express = require("express");
const app = express();
const port = 3001;
const userRouter = require("./routes/user");
const movieRouter = require("./routes/movie");
const loginRouter = require("./routes/login");
const reviewRouter=require("./routes/review")
const cors = require("cors");
var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "ok " });
});
app.use("/user",userRouter);
app.use("/movie",movieRouter);
app.use("/login",loginRouter);
app.use("/review",reviewRouter);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

