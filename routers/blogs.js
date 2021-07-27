import express from 'express';
const blogrouter = express.Router();
import Validate from '../Middlewares/auth'
import addBlogsController from '../Controllers/addBlogsController';

// @desc Doing CRUD Operation
// @route [+]
blogrouter.get('/add',Validate.ensureAuth,addBlogsController.add);
blogrouter.post('/add',Validate.ensureAuth,addBlogsController.addData);
blogrouter.get('/delete/:id',Validate.ensureAuth,addBlogsController.distroy);
blogrouter.get('/edit/:id',Validate.ensureAuth,addBlogsController.edit);
blogrouter.post('/edit/:id',Validate.ensureAuth,addBlogsController.newEdit);

// @desc Public Blogs
// @route /blogs
blogrouter.get('/blogs',Validate.ensureAuth,addBlogsController.store);
blogrouter.get('/blog/:id',Validate.ensureAuth,addBlogsController.blogbyId);
export default blogrouter;