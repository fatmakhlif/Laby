import express from 'express'
const router = express.Router()

import { createLab, deleteLab, getAllLabs, updateLab, showStats } from '../controllers/labController.js'

router.route('/').post(createLab).get(getAllLabs)

router.route('/stats').get(showStats)
router.route('/:id').delete(deleteLab).patch(updateLab)

export default router