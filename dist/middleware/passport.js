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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const db = __importStar(require("../fake-db"));
passport_1.default.use(new passport_local_1.Strategy((username, password, done) => {
    const user = db.getUserByUsername(username);
    if (!user) {
        return done(null, false, { message: 'Username not found' });
    }
    if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password' });
    }
    return done(null, user);
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id); // Cast user to User type
});
passport_1.default.deserializeUser((id, done) => {
    const user = db.getUser(id); // Cast id to number
    if (!user) {
        return done(new Error("User not found"));
    }
    done(null, user);
});
exports.default = passport_1.default;
//# sourceMappingURL=passport.js.map