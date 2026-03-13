const mongoose = require('mongoose');

const AttendanceSheetSchema = new mongoose.Schema({
  email: String,
  sessionId: String,
  sessionDate:String,
  sessionTime:String,
  studentsAttendance: [
    {
      regNum: String,
      longitude: Number,
      latitude:Number
    }
  ]
});

const AttendanceSheet = mongoose.model('AttendanceSheet', AttendanceSheetSchema);

module.exports = AttendanceSheet;
