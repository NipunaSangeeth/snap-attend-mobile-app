const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth2');

const Admin = mongoose.model('Admin');

const router = express.Router();

router.use(requireAuth);

router.get('/getUserDetails1', async (req,res) => {
  const { _id: userId } = req.user; // Assuming userId is available in req.user

  try {
    const user = await Admin.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    const email = user.email;
    const batchCode = user.batchCode;
    res.status(200).json({email,batchCode});

  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
})
  
  module.exports = router;