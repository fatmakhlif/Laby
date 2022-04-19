import express from 'express';
const  router = express.Router()

import {login ,updateUser} from '../controllers/authController.js' ;


router.route('/login').post(login);
router.route('/updateUser').patch(updateUser)

export default router ; 