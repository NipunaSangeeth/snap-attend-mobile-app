const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/allAuth');
const Session = mongoose.model('Session');
const Attendance = mongoose.model('Attendance');
const AttendanceSheet = mongoose.model('AttendanceSheet');

const router = express.Router();

router.use(requireAuth);

router.post('/session-details/code', async (req, res) => {
  try {
    const { code } = req.body;  // Use req.params to get the code from the URL
    // Check if the code has exactly 4 digits
    if (!/^\d{4}$/.test(code)) {   
      throw new Error('Code must be exactly 4 digits');
    }
    const Attendance_Code = code;
    console.log('ff',Attendance_Code);
    // Check if the session exists in the database
    const existingSession = await Session.findOne({ Attendance_Code });

    if (existingSession) {
      //console.log('Session details:', existingSession);
      res.status(200).send({ session: existingSession });
    } else {
      console.log('Session does not exist in the database');
      res.status(404).send({ error: 'Session does not exist in the database' });
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(400).send({ error: error.message });
  }
});


router.post('/create-session', async (req, res) => {
    try {
      const currentTime = new Date();
      const Attendance_Code = Math.floor(Math.random() * 9000) + 1000;
      const { Module_Name, Module_Code,Lectruer_Name,Venue,Session_Start_Date,Session_End_Time,Session_Start_Time} = req.body;
      const myNumber = parseInt(Session_End_Time, 10);
    
  // Add session end time to the current time
      const combinedTime = new Date(currentTime.getTime() + myNumber * 60 * 1000);
      const formattedCurrentTime = currentTime.toLocaleTimeString('en-US', { hour12: false });
      const formattedCombinedTime = combinedTime.toLocaleTimeString('en-US', { hour12: false });
      // Create a new session
      const newSession = new Session({
        Module_Code,
        email:req.user.email,
        Module_Name,
        Lectruer_Name,
        Venue,
        Attendance_Code,
        Session_Start_Date,
        Session_End_Time:formattedCombinedTime,
        Session_Start_Time
      });
      // Save the new session to the database
      await newSession.save();
      res.status(201).send({ message: 'New session created', sessionId: newSession._id, Attendance_Code,myNumber, });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(400).send({ error: error.message });
    }
  });

  //Student Attendance Code
  router.post("/deleteAttendanceCode", async (req, res) => {
    try{
      const id = req.query.sessionId;
      const attendanceCodeDelete = await Session.findById(id);
      attendanceCodeDelete.Attendance_Code = 0;
      await attendanceCodeDelete.save();
      const attendanceDetails = await Attendance.find({sessionId:id});
      const newAttendanceSheet = new AttendanceSheet({
        email: req.user.email,
        sessionId: id,
        sessionDate: attendanceCodeDelete.Session_Start_Date,
        sessionTime: attendanceCodeDelete.Session_Start_Time,
        studentsAttendance: attendanceDetails.map(attendance => ({
            regNum: attendance.studentId,
            longitude: attendance.longitude,
            latitude: attendance.latitude
        }))
    });
      await newAttendanceSheet.save();
      res.status(201).send({newAttendanceSheet});
    } catch(error){
      console.log(error)
    }
  });


  //Student Attendance Code
router.get("/getattendance", async (req, res) => {
  try {
    const sessionid = req.query.sessionId;
    try {
      const attendanceHistory = await AttendanceSheet.findOne({sessionId:sessionid});
      res.status(200).json(attendanceHistory);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    res.status(500).json({ message: "get Attendance failed" });
  }
});


router.get("/attendanceList", async (req, res) => {
  try {
    try {
      const attendanceHistory = await Session.find({email:req.user.email});
      res.status(200).json(attendanceHistory);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    res.status(500).json({ message: "get Attendance failed" });
  }
});

 
module.exports = router;
