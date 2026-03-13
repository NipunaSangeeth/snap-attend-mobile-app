require('dotenv').config();
require('./models/Student');
require('./models/Teacher');
require('./models/Admin');
require('./models/Session');
require('./models/Attendance');
require('./models/TimeTable');
require('./models/AttendanceSheet');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const submitCode = require('./routes/submitCode');
const SubmitAttendance = require('./routes/SubmitAttendance');
const Timetable = require('./routes/getTimetable');
const admin = require('./routes/admin');
const teacherGet = require('./routes/teacherGet');
const requireAuth = require('./middlewares/requireAuth');
const requireAuth1 = require('./middlewares/requireAuth1');
const requireAuth2 = require('./middlewares/requireAuth2');

const app = express();

app.use(bodyParser.json());

// Request logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    if (req.body && Object.keys(req.body).length > 0) {
        const bodyCopy = { ...req.body };
        if (bodyCopy.password) bodyCopy.password = '********';
        console.log('Body:', bodyCopy);
    }
    next();
});

app.use(authRoutes);
app.use(submitCode);
app.use(SubmitAttendance);
app.use(Timetable);
app.use(admin);
app.use(teacherGet);

const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, {

});

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo', err);
});

app.get('/', requireAuth,(req,res) => {
    res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});