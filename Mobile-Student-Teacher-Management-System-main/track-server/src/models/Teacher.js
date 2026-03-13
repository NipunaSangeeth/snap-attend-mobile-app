const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const teacherSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      // role: {
      //   type: Number,
      //   default: 0,
      // },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      // verified: {
      //   type: Boolean,
      //   default: false,
      // },
      // verificationToken: String,
      // addresses: [
      //   {
      //     name: String,
      //     mobileNo: String,
      //     houseNo: String,
      //     street: String,
      //     landmark: String,
      //     city: String,
      //     country: String,
      //     postalCode: String,
      //   },
      // ],
      // orders: [
      //   {
      //     type: mongoose.Schema.Types.ObjectId,
      //     ref: "Order",
      //   },
      // ],
      // createdAt: {
      //   type: Date,
      //   defult: Date.now,
      // },
    },
  //   { timestamps: true }
  );

teacherSchema.pre('save', function(next){
    const user=this;
    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, (err,salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password,salt,(err,hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        })
    })
})

teacherSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;

    return new Promise((resolve,reject) => {
        bcrypt.compare(candidatePassword,user.password, (err, isMatch) => {
            if (err) {
                return reject(err);
            }

            if(!isMatch) {
                return reject(false);
            }
            resolve(true);
        })
    })
}

mongoose.model('Teacher', teacherSchema);