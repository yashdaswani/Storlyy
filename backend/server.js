const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const formRoutes = require("./routes/formRoutes");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Routes
app.use("/api", formRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
