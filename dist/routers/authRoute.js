"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("../middleware/passport"));
const router = express_1.default.Router();
router.get("/login", (req, res) => {
    res.render("../views/login");
});
router.post("/login", passport_1.default.authenticate("local", {
    successRedirect: "/posts", // Redirect here after successful login
    failureRedirect: "/auth/login", // Redirect back to login on failure
    failureFlash: false // Set this to true if you're using flash messages
}));
router.get("/logout", (req, res) => {
    req.logout(() => { });
    res.redirect("/");
});
exports.default = router;
//# sourceMappingURL=authRoute.js.map