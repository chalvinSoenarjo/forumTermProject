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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const express_1 = __importDefault(require("express"));
const database = __importStar(require("../controller/postController"));
const checkAuth_1 = require("../middleware/checkAuth");
const router = express_1.default.Router();
// List posts
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield database.getPosts(20);
    const user = req.user;
    res.render("posts", { posts, user });
}));
// Create post form
router.get("/create", checkAuth_1.ensureAuthenticated, (req, res) => {
    res.render("createPosts");
});
// Handle post creation
router.post("/create", checkAuth_1.ensureAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, link, description, subgroup } = req.body;
    const creator = req.user.id;
    database.addPost(title, link, creator, description, subgroup);
    res.redirect('/posts');
}));
// Display individual post
router.get("/show/:postid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = database.getPost(req.params.postid);
    res.render("individualPost", { post });
}));
// Edit post form
router.get("/edit/:postid", checkAuth_1.ensureAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = database.getPost(req.params.postid);
    if (req.user.id !== post.creator.id) {
        return res.status(403).send("Unauthorized");
    }
    res.render("editPost", { post });
}));
// Handle post editing
router.post("/edit/:postid", checkAuth_1.ensureAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, link, description, subgroup } = req.body;
    database.editPost(req.params.postid, { title, link, description, subgroup });
    res.redirect(`/posts/show/${req.params.postid}`);
}));
// Confirm delete post
router.get("/deleteconfirm/:postid", checkAuth_1.ensureAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = database.getPost(req.params.postid);
    if (req.user.id !== post.creator.id) {
        return res.status(403).send("Unauthorized");
    }
    res.render("deletePostConfirm", { post });
}));
// Handle post deletion
router.post("/delete/:postid", checkAuth_1.ensureAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    database.deletePost(req.params.postid);
    res.redirect('/posts');
}));
// Handle comment creation
router.post("/comment-create/:postid", checkAuth_1.ensureAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { description } = req.body;
    const creator = req.user.id;
    database.addComment(req.params.postid, creator, description);
    res.redirect(`/posts/show/${req.params.postid}`);
}));
exports.default = router;
//# sourceMappingURL=postRouters.js.map