import { StatusCodes } from "http-status-codes"

import { BadRequestError ,UnAuthenticatedError} from "../errors/index.js"
import User from "../models/User.js"

const register = async (req,res)=>{
    const {name , email, password}=req.body 
    if (!name || !email || !password){
        throw new BadRequestError('please provide all values')
    }
    const userAlreadyExists = await User.findOne({email})
if (userAlreadyExists){
    throw new BadRequestError('email already in use ')
}
const user = await User.create({name,email, password })

//const token = user.createJWT()
res.status(StatusCodes.CREATED).json({
    user:{
        email: user.email,
        lastname : user.lastname,
        location : user.location,
        name:user.name,
        password:user.password,
    }
})

}

const login =  async (req,res)=>{
   const {email , password} = req.body 
   if (!email || !password ){
       throw new BadRequestError('Please provide all values ')
   }
   const user = await User.findOne({email}).select('+password' )
   if (!user){
       throw new  UnAuthenticatedError('invalid ')
   }
   const isPasswordCorrect = await user.comparePassword(password)
   if (!isPasswordCorrect){
    throw new  UnAuthenticatedError('invalid  password')
    }
    const token = user.createJWT()
    user.password = undefined 
    res.status(StatusCodes.OK).json({user,token,location:user.location})

   res.send('login user')

    
}

const updateUser = async (req, res) => {
    const { email, name, lastName, location,password} = req.body
    if (!email || !name || !lastName || !location || !password) {
      throw new BadRequestError('Please provide all values')
    }
  
    const user = await User.findOne({ _id: req.user.userId })
  
    user.email = email
    user.name = name
    user.lastName = lastName
    user.location = location
    user.password = password
  
    await user.save()
  
    // various setups
    // in this case only id
    // if other properties included, must re-generate
  
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({
      user,
      token,
      location: user.location,
    })
  }

export {updateUser, login,register }