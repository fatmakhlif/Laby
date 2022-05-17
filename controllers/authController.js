import User from '../models/User.js'
import { BadRequestError ,UnAuthenticatedError} from "../error/index.js"
import { StatusCodes } from "http-status-codes";
const addUser = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        throw new BadRequestError('please provide all values')
    }
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
        throw new BadRequestError('Email Allready in use')
    }
    const user = await User.create({ name, email, password })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED)
        .json(
            {
                user: {
                    email: user.email,
                    name: user.name
                }, token
            })
}
const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError('Please provide all values ')
    }
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
        throw new UnAuthenticatedError('invalid ')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnAuthenticatedError('invalid  password')
    }
    const token = user.createJWT()
    user.password = undefined
    res.status(StatusCodes.OK).json({ user, token, location: user.location })

    res.send('login user')
}

const updateUser = (req, res) => {
    res.send('update user ')
    User.findOneAndUpdate
}

export { addUser, updateUser, login }