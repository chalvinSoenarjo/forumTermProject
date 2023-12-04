
import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { IVerifyOptions } from 'passport-local';
import * as db from '../fake-db';

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login', { message: '' }); // Ensure 'message' is defined, even if it's an empty string
});


// Modified login route
router.post('/login', passport.authenticate('local', {
    successRedirect: '/posts',
    failureRedirect: '/auth/login',
    failureFlash: false  // set to true if using flash messages
}));



router.get("/logout", (req, res) => {
    req.logout(() => {});
    res.redirect("/");
});

router.get('/signup', (req, res) => {
    res.render('signup'); // Render the signup form
});


router.post('/signup', (req, res) => {
    const { uname, password } = req.body;
    // Implement logic to add user to your database
    db.addUser(uname, password); // Or handle the logic as needed
    res.redirect('/auth/login'); // Redirect to login page after signup
});

export default router;