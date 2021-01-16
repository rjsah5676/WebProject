const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId }
} = Schema;
const boardSchema = new Schema({
  writer: {
    type: ObjectId,
    required: true,
    ref: "User"
  },
  writerName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    default:"기타"
  },
  content: {
    type: String,
    required: true
  },
  imgPath: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    default: 0
  },
  rating_people: {
    type: Number,
    default: 0
  },
});

module.exports = mongoose.model("Board", boardSchema);
