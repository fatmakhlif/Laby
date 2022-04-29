  import express from 'express'
  const router = express.Router()
   
 import  {createChercheur , deleteChercheur , getAllChercheurs , updateChercheur , showStats } from '../controllers/chercheurController.js'


 router.route('/').post(createChercheur).get(getAllChercheurs)
 router.route('/stats').get(showStats)
 router.route('/:id').delete(deleteChercheur).patch(updateChercheur)

export default router 