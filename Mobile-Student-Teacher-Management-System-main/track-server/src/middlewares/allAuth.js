const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Student = mongoose.model('Student');
const Teacher = mongoose.model('Teacher');
const Admin = mongoose.model('Admin');

module.exports = (req,res,next) => {
    const {authorization} = req.headers;

    if(!authorization) {
        return res.status(401).send({error:'You must be logged in. (Missing Auth)'});
    }

    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, 'MY_SECRET_KEY', async (err,payload) => {
        if (err) {
            return res.status(401).send({ error: 'You must be logged in. (Invalid Token)'});
        }
        
        const { userId, userType } = payload;
        let user;

        try {
            if (userType === 1) {
                user = await Student.findById(userId);
            } else if (userType === 2) {
                user = await Teacher.findById(userId);
            } else if (userType === 3) {
                user = await Admin.findById(userId);
            }

            if (!user) {
                console.log(`Auth failed: User with ID ${userId} and type ${userType} not found`);
                return res.status(401).send({ error: 'User account no longer exists.' });
            }

            req.user = user;
            req.userType = userType;
            next();
        } catch (error) {
            console.error('Middleware error:', error);
            return res.status(500).send({ error: 'Internal Server Error' });
        }
    })
};
