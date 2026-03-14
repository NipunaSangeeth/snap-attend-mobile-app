const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Attendance = mongoose.model('Attendance');

const router = express.Router();

router.use(requireAuth);

router.post('/submit-attendance', async (req, res) => {
  try {
    const { currentLocation } = req.body;
    if (!currentLocation || typeof currentLocation !== 'object') {
      throw new Error('Valid current location is required');
    }
    const { latitude, longitude } = currentLocation;
    const {moduleName, moduleCode,venue, startTime,sessionId} = req.body;
    
    // Check if latitude and longitude are valid
    if (latitude === undefined || longitude === undefined) {
      throw new Error('Latitude and longitude are required within currentLocation');
    }

    // Check if the student has already submitted attendance for this session
    const existingAttendance = await Attendance.findOne({ 
      studentId: req.user.regNum, 
      sessionId: sessionId 
    });

    if (existingAttendance) {
      return res.status(422).send({ error: 'Attendance already marked for this session' });
    }

    // Create a new attendance record
    const newAttendance = new Attendance({
      studentId: req.user.regNum,
      latitude,
      longitude,
      moduleName,
      moduleCode,
      venue,
      startTime,
      sessionId
    });

    // Save the new attendance to the database
    await newAttendance.save();

    console.log('New attendance submitted:', newAttendance);
    res.status(201).send({ message: 'Attendance submitted successfully', attendance: newAttendance });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(400).send({ error: error.message });
  }
});

router.get('/attendance-history', async (req, res) => {
  try {
    const userId  = req.user.regNum;
    // Find all attendance records for the given userId
    const attendanceHistory = await Attendance.find({ studentId: userId });
    // Extract module name and code from each attendance record
    const modules = attendanceHistory.map(attendance => ({
      _id:attendance._id,
      moduleName: attendance.moduleName,
      moduleCode: attendance.moduleCode,
      startTime: attendance.startTime,
      attendanceDate:attendance.attendanceDate
    }));
    res.status(200).send({ userId, attendanceHistory: modules });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

module.exports = router;
