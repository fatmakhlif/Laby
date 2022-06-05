import Lab from "../models/Lab.js"
import { BadRequestError, UnAuthenticatedError } from "../error/index.js"
import { StatusCodes } from "http-status-codes";
const createLab = async (req, res) => {
  const {
    name,
    acronym,
    type,
    phone,
    webSite,
    email,
    specialty,
    domain,
    researchAreas,
    institution,
    university,
    manager,
    local,status } = req.body
  console.log(req.body)
  if (!name || !acronym || !phone || !email || !specialty || !domain || !researchAreas|| !status || !university) {
    throw new BadRequestError('Please provide all values')
  }
  const lab = await Lab.create(req.body)
  res.status(StatusCodes.CREATED).json({ lab })
}

const deleteLab = async (req, res) => {

}

const getAllLabs = async (req, res) => {
  const labs = await Lab.find()
  res.status(StatusCodes.OK).json({ labs, tolalLabs: labs.length })
}

const updateLab = async (req, res) => { 
  const { id: labId } = req.params 
  const {
    name,
    acronym,
    type,
    phone,
    webSite,
    email,
    specialty,
    domain,
    researchAreas,
    institution,
    university,
    manager,
    local,
    status} = req.body
    if (!name || !acronym || !phone || !email || !specialty || !domain || !researchAreas || !status || !university) {
      throw new BadRequestError('Please provide all values')
    }
  const lab = await Lab.findOne({ _id: labId })
  if (!lab) {
    throw new NotFoundError(`No lab with id ${labId} `)
  }
  lab.name = name
  lab.acronym = acronym
  lab.phone = phone
  lab.email = email
  lab.specialty = specialty
  lab.domain = domain 
  lab.researchAreas = researchAreas
  lab.type = type
  lab.status = status
  lab.university = university
  await lab.save()
  res.status(StatusCodes.OK).json({lab})
} 

const showStats = async (req, res) => { res.send(' showStats') }

export { createLab, deleteLab, getAllLabs, updateLab, showStats }