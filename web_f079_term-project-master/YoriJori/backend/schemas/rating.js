const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId }
} = Schema;
const ratingSchema = new Schema({
  writer: {
    type: ObjectId,
    required: true,
    ref: "User"
  },
  board: {
    type: ObjectId,
    required: true,
    ref: "Board"
  },
  rating: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model("Rating", ratingSchema);