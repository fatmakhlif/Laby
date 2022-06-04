  import express from 'express'
  const router = express.Router()
   
 import  {createResearcher ,getAllResearchers, deleteChercheur  , updateResearcher , showStats } from '../controllers/ResearchersController.js'


 router.route('/').post(createResearcher).get(getAllResearchers)
 router.route('/stats').get(showStats)
 router.route('/:id').delete(deleteChercheur).patch(updateResearcher)

export default router 