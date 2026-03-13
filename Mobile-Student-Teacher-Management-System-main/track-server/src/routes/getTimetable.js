const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/allAuth');
const Timetable = mongoose.model('Timetable');
const Student = mongoose.model('Student');

const router = express.Router();

router.use(requireAuth);

router.post('/api/saveTimetable', async (req, res) => {
    const { batchCode, timetable1 } = req.body;
    const timetable = timetable1.map((set) => {
      return set.reduce((result, item) => {
        switch (item.placeholder) {
          case 'Module Name':
            result.name = item.value;
            break;
          case 'Module Code':
            result.code = item.value;
            break;
          case 'Venue':
            result.venue = item.value;
            break;
          case 'Session Start Time':
            result.startTime = item.value;
            break;
          case 'Session End Time':
            result.endTime = item.value;
            break;
          case 'Session Start Date':
            result.startDate = item.value;
            break;
          case 'Session End Date':
            result.endDate = item.value;
            break;
          default:
            break;
        }
        return result;
      }, {});
    });
    
    try {
      const existingTimetable = await Timetable.findOne({ batchCode });
      if (existingTimetable) {
        existingTimetable.timetable = timetable;
        await existingTimetable.save();
      } else {
        await Timetable.create({ batchCode,timetable });
      }
      res.status(200).json({ message: 'Timetable saved successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error.' });
    }
  });
  
  // Route to get timetable
  router.get('/api/getTimetable', async (req, res) => {
    const user = req.user;
    const userType = req.userType; // From unified auth middleware

    try {
      if (!user) {
        console.log('GetTimetable: No user in request');
        return res.status(401).json({ error: 'Not authorized.' });
      }

      let batchCode;
      if (userType === 1) { // Student
        batchCode = user.batchCode;
      } else {
        // For Teachers/Admins, we might want to allow them to query by batchCode in query params
        batchCode = req.query.batchCode || user.batchCode;
      }

      if (!batchCode) {
        console.log(`GetTimetable: No batchCode found for user ${user.email} (type ${userType})`);
        return res.status(400).json({ error: 'Batch code required.' });
      }

      console.log(`GetTimetable: Fetching for batch ${batchCode} (requested by ${user.email})`);
      const timetable = await Timetable.findOne({ batchCode });
      
      if (timetable) {
        res.status(200).json({ timetable });
      } else {
        console.log(`GetTimetable: No timetable found in database for batch code: "${batchCode}"`);
        res.status(404).json({ error: 'Timetable not found.' });
      }
    } catch (error) {
      console.error('GetTimetable error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });

  
router.get('/getUserDetails', async (req,res) => {
  const { _id: userId } = req.user; // Assuming userId is available in req.user
  try {
    const user = await Student.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    const email = user.email;
    const batchCode = user.batchCode;
    const regNum = user.regNum;
    res.status(200).json({email,batchCode,regNum});
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
})


router.get('/getAllBatchCodes', async (req, res) => {
  try {
    const batchCodes = await Timetable.distinct('batchCode');
    if (!batchCodes || batchCodes.length === 0) {
      return res.status(404).json({ error: 'No batch codes found.' });
    }
    res.json({ batchCodes });
  } catch (error) {
    console.error('Error fetching batch codes:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.get('/api/getData', async (req, res) => {
  try {
    console.log(req.body)
    const { code }= req.body;
    const batchCode = code;
    const details = await Timetable.findOne({batchCode});
    res.json({ details });
  } catch (error) {
    console.error('Error fetching batch codes:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

  
  module.exports = router;