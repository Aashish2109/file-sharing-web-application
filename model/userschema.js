const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const hashing = require("bcrypt")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    uploadedFiles: [ // Array of uploaded file objects
        {
            fileName: {
                type: String,
                required: true,
            },
            filePath: {
                type: String,
                required: true,
            },
            originalName: {
                type: String,
                required: true,
            },
        }
    ],
    tokens: [
        {
            token:
            {
                type: String,
                required: true
            }
        }
    ]
})

//Password Hashing

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await hashing.hash(this.password, 12);
        this.cpassword = await hashing.hash(this.password, 12);
    }
    next();
});
//Token Generation
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    }
    catch (err) {
        console.log(err);
    }
}

const User = mongoose.model('ONGCDATAS', userSchema);

module.exports = User;