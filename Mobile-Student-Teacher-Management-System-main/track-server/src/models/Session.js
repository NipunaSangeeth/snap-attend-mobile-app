const mongoose = require('mongoose');

// Define the session schema
const sessionSchema = new mongoose.Schema({
    Module_Name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    Module_Code: {
        type: String,
        required: true
    },
    Lectruer_Name: {
        type: String,
        required: true
    },
    Venue: {
        type: String,
        required: true
    },
    Attendance_Code: {
        type: Number,
        required: true
    },
    Session_Start_Date: {
        type: String,
        required: true
    },
    Session_End_Time:{
        type:String,
        required: true
    },
    Session_Start_Time:{
        type:String,
        required: true
    },
    
    
});

// Create a 'Sessionm' model using the sessionSchema
mongoose.model('Session', sessionSchema);


