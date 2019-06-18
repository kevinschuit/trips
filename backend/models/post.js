const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  startZipcode: {
    type: String,
    required: true
  },
  startNumber: {
    type: String,
    required: true
  },
  startKms: {
    type: Number,
    required: true
  },
  endZipcode: {
    type: String,
    required: true
  },
  endNumber: {
    type: String,
    required: true
  },
  endKms: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  privateDetourKms: {
    type: Number,
    required: true
  },
  deviatingRoute: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Post", tripSchema);
