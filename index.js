const express = require("express");
const connectMongo = require("./db");

const app = express();

connectMongo();

app.use(express.json()); // to use req.body

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/", require("./routes/notes"));


const PORT = 5000;
app.listen(PORT, () => {
  console.log("server started.......");
});