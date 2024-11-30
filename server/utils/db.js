const mongoose = require("mongoose");
module.exports = mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log(error, "MongoDB failed to connect ");
  });
