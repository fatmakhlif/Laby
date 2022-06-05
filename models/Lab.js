import mongoose from 'mongoose'
import validator from 'validator'
const LabSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide name'],
        minlength: 3,
        trim: true
    },
    acronym: {
        type: String,
        required: [true, 'please provide acronym']
    },
    type: {
        type: String,
        enum: ['Research Unit', 'Research laboratory'],
        default: 'Research laboratory'
    },
    phone: {
        type: String,
        match: /^(\+\d{1,3}\s)?\(?\d{2}\)?[\s.-]\d{3}[\s.-]\d{3}$/,
        required: [true, 'please provide phone number'],
    },
    webSite: {
        Type: String,
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
    specialty: {
        type: String,
        required:[true,'please provide specialty'],
    },
    domain: {
        type: String,
        required:[true,'please provide domain'],
    },
    researchAreas: {
        type: String,
        required:[true,'please provide research areas '],
    },
    institution: {
        type:String,
    },
    university:{
        type: String,
        required:[true,'please provide university '],
    },
    manager: {
        type:String,
    },
    local: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default:'active'
    }
})

export default mongoose.model('Lab',LabSchema)