import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide name'],
        minlength: 3,
        maxlength: 20,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'please provide email'],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'please give a valid email',
        },

    },
    password: {
        type: String,
        required: [true, 'please provide password'],
        minlength: 6,
        select: false,

    },
    lastName: {
        type: String,
        maxlength: 20,
        default: 'lastName',
        trim: true
    }, 
})
UserSchema.pre('save', async function () {


    if (!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
}
UserSchema.methods.comparePassword = async function (condidatePassword) {
    const isMatch = await bcrypt.compare(condidatePassword, this.password)
    return isMatch
}
export default mongoose.model('User', UserSchema)