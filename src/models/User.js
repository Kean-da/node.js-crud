const mongoose  = require('mongoose');
const bcrypt    = require('bcrypt');
const validator = require('validator');

const userSchema = mongoose.Schema(
    {
        full_name: {
            type: String,
            required: [true, 'Please enter your full name.'],
            trim: true,
            match: [/^[a-zA-Z\s]+$/, 'Invalid first name.'],
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: [true, 'Please enter your email.'],
            validate: {
                validator: (value) => {
                    return validator.isEmail(value);
                },
                message: "Invalid input email"
            },
        },
        phone_number: {
            type: String,
            match: [/^\d{11}$/, 'Invalid phone number.'],
            validate: {
                validator: (value) => {
                    return !validator.isAlpha(value);
                },
                message: "Invalid phone number, it's contain character string."
            },
            trim: true
        },
        password: {
            type: String,
            minlength: [8, "Password should have atleast 8 characters"],
            maxlength: [8, "Password should have atleast 8 characters"],
            required: [true, 'Please enter your password.'],
            trim: true
        },
    },
    {
        timestamps: true, 
    }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async (enteredPassword, password) => {
    return await bcrypt.compare(enteredPassword, password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;