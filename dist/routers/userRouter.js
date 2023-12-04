"use strict";
// In your user routes file (e.g., userRouter.ts)
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/signup', (req, res) => {
    res.render('signup'); // Render the signup form
});
router.post('/signup', (req, res) => {
    const { uname, password } = req.body;
    // Implement logic to add user to your database
    // For example: db.addUser(uname, password);
    res.redirect('/login'); // Redirect to login page after signup
});
exports.default = router;
//# sourceMappingURL=userRouter.js.map