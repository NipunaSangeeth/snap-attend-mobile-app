const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth1');
const Teacher = mongoose.model('Teacher');

const router = express.Router();

router.use(requireAuth);

router.get('/getUserDetails2', async (req,res) => {
  const { _id: userId } = req.user; // Assuming userId is available in req.user
  try {
    const user = await Teacher.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    const email = user.email;
    const name = user.name;
    res.status(200).json({email,name});
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
})

  module.exports = router;