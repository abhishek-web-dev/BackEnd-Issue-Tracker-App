'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const querySchema = new Schema({
  queryId: {
    type: String,
    required:true,
    index:true
  },
  status: {
    type: String,
    required:true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  recieverName: {
    type: String,
    required: true
  },
  recieverId: {
    type: String,
    required: true
  },
  creatorName: {
    type: String,
    required: true
  },
  creatorId: {
    type: String,
    required: true
  },
  userWatchlistIds: {
      type: Array
  },
  image: {
      type: String
  },
  createdOn: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('query', querySchema);



