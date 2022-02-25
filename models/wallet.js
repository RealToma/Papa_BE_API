'use strict';

const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    require: true,
    default: "Normal"
  },
  status: {
    type: String,
    default: ""
  },
    
});

module.exports = mongoose.model("Wallet", schema);