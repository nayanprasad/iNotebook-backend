const mongoose = require("mongoose");

const notesSchema = new Schema({
  name : {
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