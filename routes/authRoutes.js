import express from 'express';
const router = express.Router()
import authenticateUser from '../middleware/auth.js'
import {  login, updateUser} from '../controllers/authController.js';

router.route('/login').post(login);
router.route('/update-user').patch(authenticateUser, updateUser)
export default router; 