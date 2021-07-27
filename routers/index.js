import express from 'express';
const router = express.Router();
import LoginController from '../Controllers/LoginController'
import UserController from '../Controllers/UserController'
import Validate from '../Middlewares/auth'

// @desc Login Landing page
// @route GET/
router.get('/',Validate.ensureGuest,LoginController.login);


// @desc dashboard  page 
// @route GET/
router.get('/dashboard', Validate.ensureAuth ,UserController.blogs);
export default router;