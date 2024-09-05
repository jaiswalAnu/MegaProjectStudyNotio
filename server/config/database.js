const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
  const connectWithRetry = () => {
    console.log("MongoDB connection with retry");

    mongoose
      .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("DB connected successfully");
      })
      .catch((error) => {
        console.log("DB Issue, retrying in 5 seconds");
        console.error("Error details:", error.message);
        setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
      });
  };

  connectWithRetry();
};
