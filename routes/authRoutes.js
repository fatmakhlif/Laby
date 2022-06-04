import express from 'express';
const  router = express.Router()

import {register,login ,updateUser} from '../controllers/authController.js' ;
import authenticateUser from '../middleware/auth.js'

router.route('/updateUser').patch(authenticateUser, updateUser)
router.route('/login').post(login);
router.route('/register').post(register);


export default router ; 