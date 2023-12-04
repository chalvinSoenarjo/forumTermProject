import express from "express";
import passport from "../middleware/passport";

const router = express.Router();

router.get("/login", (req, res) => {
    res.render("../views/login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/posts",
    failureRedirect: "/auth/login",
    failureFlash: false
}));

router.get("/logout", (req, res) => {
    req.logout(() => {});
    res.redirect("/");
});

export default router;
