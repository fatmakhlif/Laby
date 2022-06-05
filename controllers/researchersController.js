import Researcher from '../models/Researcher.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js'
import mongoose from 'mongoose'
const createResearcher = async (req, res) => {
  const { category, fullName,telephone,dateOfBirth, institution,CIN,email,grade } = req.body

  if (!category || !fullName || !institution || !email || !telephone ||!CIN || !dateOfBirth ) {
    throw new BadRequestError('Please Provide All Values')
  }

  req.body.createdBy = req.user.userId

  const researcher = await Researcher.create(req.body)
  res.status(StatusCodes.CREATED).json({ researcher })
}
const getAllResearchers = async (req, res) => {
  // const researchers = await Researcher.find()
  const { search, status, category, sort } = req.query

  const queryObject = {
    createdBy: req.user.userId,
  }
  if (search) {
    queryObject.fullName = { $regex: search, $options: 'i' }
  }
  if (status !== 'all') {
    queryObject.status = status
  }
  if (category !== 'all') {
    queryObject.category = category
  }
  
  // NO AWAIT
  let result = Researcher.find(queryObject)

  if (sort === 'latest') {
    result = result.sort('-createdAt')
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt')
  }
  if (sort === 'a-z') {
    result = result.sort('fullName')
  }
  if (sort === 'z-a') {
    result = result.sort('-fullName')
  }
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit //10
  result = result.skip(skip).limit(limit)

  // chain sort conditions

  const researchers = await result
  const totalResearchers = await Researcher.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalResearchers / limit)
  res.status(StatusCodes.OK).json({ researchers, totalResearchers: researchers.length, numOfPages: 1 })
}


const deleteChercheur = async (req,res)=>{res.send('deleteChercheur')}



const updateResearcher = async (req,res)=>{
  const { id: researcherId } = req.params

  const { category, fullName,telephone,dateOfBirth, institution,CIN,email,grade} = req.body

  if (!category || !fullName || !institution || !email || !telephone ||!CIN || !dateOfBirth ) {
    throw new BadRequestError('Please Provide All Values')
  }

  const researcher = await Researcher.findOne({ _id: researcherId })

  if (!researcher) {
    throw new NotFoundError(`No researcher with id ${researcherId}`)
  }

  // check permissions
  // checkPermissions(req.user, researcher.createdBy)

  const updatedResearcher = await Researcher.findOneAndUpdate({ _id: researcherId }, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(StatusCodes.OK).json({ updatedResearcher })




}

const showStats = async (req,res)=>{
  let stats = await Researcher.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$category', count: { $sum: 1 } } },
  ])
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr
    acc[title] = count
    return acc
  }, {})

  const defaultStats = {
    MasterStudent: stats.MasterStudent || 0,
    PhDStudent: stats.PhDStudent || 0,
    Doctor: stats.Doctor || 0,
    UniversityTeacher : stats.UniversityTeacher || 0,
  }
  let monthlyApplications = []
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
}


export {createResearcher ,getAllResearchers, deleteChercheur  , updateResearcher , showStats }


