import express from 'express';
const  router = express.Router()

import {addUser ,login ,updateUser} from '../controllers/authController.js' ;

router.route('/add-user').post(addUser)
router.route('/login').post(login);
router.route('/update-user').patch(updateUser)

export default router ; 