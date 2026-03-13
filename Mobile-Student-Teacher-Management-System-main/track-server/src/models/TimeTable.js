const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  batchCode: String,
  timetable: [
    {
      name: String,
      code: String,
      venue: String,
      startTime: String,
      endTime: String,
      startDate: String,
      endDate: String
    }
  ]
});

const Timetable = mongoose.model('Timetable', timetableSchema);

module.exports = Timetable;
