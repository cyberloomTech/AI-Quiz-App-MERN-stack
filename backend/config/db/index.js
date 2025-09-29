const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/quizData"
);

module.exports = mongoose;
