const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
    username : {
        type: 'string',
        unique: true,
        lowercase: true,
        required : true
    },
    role: {
        type: String,
        enum: ['patient', 'administrator', 'doctor'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            // This only works on CREATE and SAVE!!!
            validator: function (el) {
                return el === this.password;
            },
            message: 'Passwords are not the same!'
        }
    },
});

const Example = mongoose.model('Example', exampleSchema);

module.exports = Example;