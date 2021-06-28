const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
  prettyLength: {
    type: String,
    required: true,
  }
});

const workbookSchema = new mongoose.Schema({
  entries: [entrySchema],
  userRef: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  }
}, {
  timestamps: true,
  collection: 'workbooks'
});

module.exports = mongoose.model('Workbook', workbookSchema);