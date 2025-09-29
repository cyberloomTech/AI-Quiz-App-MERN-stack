const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    account:{
      type:String
    },
    category: {
      type: String
    },
    mode: {
      type: String
    },
    quantity: {
      type: Number
    },
    score: {
      type: Number
    },
  },{ timestamps: true }
);

module.exports = mongoose.model("History", historySchema);
