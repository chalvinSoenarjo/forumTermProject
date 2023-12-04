import express from "express";
import passport from "../middleware/passport";

const router = express.Router();

router.get("/login", (req, res) => {
    res.render("../views/login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/posts", // Redirect here after successful login
    failureRedirect: "/auth/login", // Redirect back to login on failure
    failureFlash: false // Set this to true if you're using flash messages
}));


router.get("/logout", (req, res) => {
    req.logout(() => {});
    res.redirect("/");
});

export default router;