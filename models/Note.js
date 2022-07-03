const mongoose = require("mongoose");
const Schema = mongoose.Schema;   // === const {Schema} = require("mongoose");

const notesSchema = new Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'user'
  },
  title : {
    type : String,
    require : true
  },
  discription : {
    type : String
  },
  tag : {
    type : String,
    default : "general"
  },
  date : {
    type : Date,
    default : Date.now  // dont use Date.now()
  }
});

module.exports = mongoose.model("note", notesSchema);