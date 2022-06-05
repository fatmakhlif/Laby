import mongoose from 'mongoose'
import validator from 'validator'

const ResearcherSchema = new mongoose.Schema(
  {
    fullName : {
        type :String,
        required:[true, 'please provide fullName'],
        minlength:3,
        maxlength:25,
        trim:true
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'please provide dateOfBirth'],
      trim: true,
    },
    CIN : {
      type :String,
      required:[true, 'please provide CIN'],
      minlength:8,
      maxlength:8,
      trim:true
  },  
    telephone : {
      type :String,
      required:[true, 'please provide telephone'],
      minlength:8,
      maxlength:12,
      trim:true
  }, 
    email : {
        type :String,
        required:[true, 'please provide email'],
        unique: true,
        validate :{
            validator:validator.isEmail,
            message:'please give a valid email',
        },
        
    },
   
    institution : {
        type :String,
        maxlength:20,
        trim:true,
        //default : 'my city',
    },
    status: {
      type: String,
      enum: ['actif', 'inactif'],
      default: 'actif',
    },
    category: {
        type: String,
        enum: ["MasterStudent", 'PhDStudent', 'Doctor','UniversityTeacher'],
        default: "MasterStudent",
      },
      grade: {
        type: String,
        enum:['Technologist', 'Assistant ', 'Assistant professor','Associate Professor','Master Technologist','Lecturer','Professor',''],
        default: "Technologist",
      },
    createdBy: {
     type: mongoose.Types.ObjectId,
     ref: 'User',
     required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

export default mongoose.model('Researcher', ResearcherSchema)