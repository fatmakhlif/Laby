import User from '../models/User.js'
import { BadRequestError, UnAuthenticatedError } from "../error/index.js"
import { StatusCodes } from "http-status-codes";
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
    res.status(StatusCodes.OK).json({ user, token })
}

const updateUser = async (req, res) => {
    let { email, name, lastName, password } = req.body
    if (!email || !name || !lastName || !password) {
        throw new BadRequestError('Please provide all values')
    }

    const user = await User.findOne({ _id: req.user.userId }).select('+password')

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        user.password = password
    }
    user.email = email
    user.name = name
    user.lastName = lastName
    await user.save()
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({
        user,
        token,
    })
}

export { updateUser, login }
