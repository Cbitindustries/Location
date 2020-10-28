const express = require("express");
const app = express();
const locationRoutes = require("./api/routes");
const cors = require("cors");

//Implementing Cross Origin Resource Sharing (CORS)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/location", locationRoutes);

app.use("/", (req, res, next) => {
  res.status(200).json("Ooops endpoint does not exist");
});

app.listen(process.env.PORT || 4200, () => {
  console.log("server started on port 4200");
});

module.exports = app;
