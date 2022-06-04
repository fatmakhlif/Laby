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
        local } = req.body
    if (!name || !acronym || !phone || !email || !specialty || !domain || !researchAreas) {
        throw new BadRequestError('Please provide all values')
    }
    const lab = await Lab.create(req.body)
    res.status(StatusCodes.CREATED).json({ lab })
}

const deleteLab = async (req, res) => { res.send('deleteLab') }

const getAllLabs = async (req, res) => { res.send('getAllLabs') }

const updateLab = async (req, res) => { res.send('updateLab') }

const showStats = async (req, res) => { res.send(' showStats') }

export { createLab, deleteLab, getAllLabs, updateLab, showStats }