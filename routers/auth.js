import express from 'express';
import passport from 'passport';
const authrouter = express.Router();


// @desc Auth with Google
// @route GET /auth/google
authrouter.get('/google',passport.authenticate('google', {scope: ['profile']}));


// @desc Google auth Callback
// @route GET /auth/google/callback
authrouter.get('/google/callback',
    passport.authenticate('google' , {failureRedirect : '/'}), 
    (req, res)=>{
        res.redirect('/dashboard');
    }
);

// @desc Logout
// @route GET /auth/logout
authrouter.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
});

export default authrouter;