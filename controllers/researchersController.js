import Researcher from '../models/Researcher.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/index.js'

const createResearcher = async (req, res) => {
  const { category, fullName,telephone,dateOfBirth, institution,CIN,email } = req.body

  if (!category || !fullName || !institution || !email || !telephone ||!CIN || !dateOfBirth) {
    throw new BadRequestError('Please Provide All Values')
  }

  req.body.createdBy = req.user.userId

  const researcher = await Researcher.create(req.body)
  res.status(StatusCodes.CREATED).json({ researcher })
}
const getAllResearchers = async (req, res) => {
  const researchers = await Researcher.find({ createdBy: req.user.userId })

  res
    .status(StatusCodes.OK)
    .json({ researchers, totalResearchers: researchers.length, numOfPages: 1 })
}


const deleteChercheur = async (req,res)=>{res.send('deleteChercheur')}



const updateResearcher = async (req,res)=>{
  const { id: researcherId } = req.params

  const { category, fullName,telephone,dateOfBirth, institution,CIN,email } = req.body

  if (!category || !fullName || !institution || !email || !telephone ||!CIN || !dateOfBirth) {
    throw new BadRequestError('Please Provide All Values')
  }

  const researcher = await Researcher.findOne({ _id: researcherId })

  if (!researcher) {
    throw new NotFoundError(`No researcher with id ${researcherId}`)
  }

  // check permissions
  checkPermissions(req.user, researcher.createdBy)

  const updatedResearcher = await Researcher.findOneAndUpdate({ _id: researcherId }, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(StatusCodes.OK).json({ updatedResearcher })




}

const showStats = async (req,res)=>{res.send(' showStats')}


export {createResearcher ,getAllResearchers, deleteChercheur  , updateResearcher , showStats }


