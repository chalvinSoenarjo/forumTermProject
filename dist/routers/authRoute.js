"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("../middleware/passport"));
const router = express_1.default.Router();
router.get('/login', (req, res) => {
    res.render('login', { message: '' }); // Ensure 'message' is defined, even if it's an empty string
});
// Modified login route
router.post('/login', (req, res, next) => {
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            // User not found or password incorrect
            return res.render('login', { message: info.message });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/posts');
        });
    })(req, res, next);
});
router.get("/logout", (req, res) => {
    req.logout(() => { });
    res.redirect("/");
});
exports.default = router;
//# sourceMappingURL=authRoute.js.map