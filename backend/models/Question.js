const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title:{
    type: String
  },
  explanation:{
    type: String
  },
  answer:{
    type:String
  },
  choices:[
    {
      a:{
        type:String
      },
      selected:{
        type:String
      }
    }
  ],
  category:{
    type: String
  },
  mode:{
    type:String
  }
},{timestamps:true}
);

module.exports = mongoose.model("Question", questionSchema);