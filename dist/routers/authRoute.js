"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const db = __importStar(require("../fake-db"));
const router = express_1.default.Router();
router.get('/login', (req, res) => {
    res.render('login', { message: '' }); // Ensure 'message' is defined, even if it's an empty string
});
// Modified login route
router.post('/login', passport_1.default.authenticate('local', {
    successRedirect: '/posts',
    failureRedirect: '/auth/login',
    failureFlash: false // set to true if using flash messages
}));
router.get("/logout", (req, res) => {
    req.logout(() => { });
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
exports.default = router;
//# sourceMappingURL=authRoute.js.map