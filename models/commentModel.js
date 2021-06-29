const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const commentSchema = new Schema({

  name: String,
  commentary: String,
})

const commentModel = mongoose.model("comment", commentSchema);

module.exports = commentModel;