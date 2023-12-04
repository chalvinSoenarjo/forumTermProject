





import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { IVerifyOptions } from 'passport-local';

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

export default router;