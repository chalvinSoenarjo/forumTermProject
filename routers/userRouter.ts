// In your user routes file (e.g., userRouter.ts)

import express from 'express';
const router = express.Router();

router.get('/signup', (req, res) => {
    res.render('signup'); // Render the signup form
});

router.post('/signup', (req, res) => {
    const { uname, password } = req.body;
    // Implement logic to add user to your database
    // For example: db.addUser(uname, password);
    res.redirect('/login'); // Redirect to login page after signup
});

export default router;
