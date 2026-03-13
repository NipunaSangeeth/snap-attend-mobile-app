const mongoose = require('mongoose');

// Define the attendance schema
const attendanceSchema = new mongoose.Schema({
    studentId: {
        type: String,
        ref: 'Student.regNum'
    },
    sessionId:{
        type: String,
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    moduleName: {
        type: String,
        required:true
    },
    moduleCode: {
        type: String,
        required:true
    },
    attendanceDate: {
        type: Date,
        default: Date.now
    },
    startTime: {
        type:String,
        required:true
    }
});

// Create an 'Attendance' model using the attendanceSchema
mongoose.model('Attendance', attendanceSchema);
