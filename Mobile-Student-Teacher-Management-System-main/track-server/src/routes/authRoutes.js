const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Student = mongoose.model('Student');
const Teacher = mongoose.model('Teacher');
const Admin = mongoose.model('Admin');


const router = express.Router();

router.post('/signupS', async (req,res) => {
    const {email, password,batchCode,regNum} = req.body;
    try {
    const user = new Student({email,password,batchCode,regNum});
    await user.save();
    const userType = 1;
    const token = jwt.sign({ userId: user._id, userType }, 'MY_SECRET_KEY');
    res.send({token, userType});
    } catch (err) {
        return res.status(422).send(err.message);
    }
});

router.post('/signupT', async (req,res) => {
    
    const {email, password,name} = req.body;
    try {
    const user = new Teacher({email,password,name});
    await user.save();
    const userType = 2;
    const token = jwt.sign({ userId: user._id, userType }, 'MY_SECRET_KEY');
    res.send({token, userType});
    } catch (err) {
        return res.status(422).send(err.message);
    }
});

router.post('/signupA', async (req,res) => {
    
    const {email, password} = req.body;
    try {
    const user = new Admin({email,password});
    await user.save();
    const userType = 3;
    const token = jwt.sign({ userId: user._id, userType }, 'MY_SECRET_KEY');
    res.send({token, userType});
    } catch (err) {
        return res.status(422).send(err.message);
    }
});

router.post('/signin', async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).send({ error: 'Must provide Email and Password' });
    }
    // Check Student DB
    let user = await Student.findOne({ email });
    let userType = 1; // 1 corresponds to Student
    // If not found in Student DB, check Teacher DB
    if (!user) {
        user = await Teacher.findOne({ email });
        userType = 2; // 2 corresponds to Teacher
    }
    // If still not found, check Faculty DB
    if (!user) {
        user = await Admin.findOne({ email });
        userType = 3; // 3 corresponds to Faculty
    }
    if (!user) {
        return res.status(422).send({ error: 'Invalid email and password' });
    }
    try {
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id, userType }, 'MY_SECRET_KEY');
        res.send({ token, userType });
    } catch (err) {
        return res.status(422).send({ error: 'Invalid email and password' });
    }
});


module.exports = router;