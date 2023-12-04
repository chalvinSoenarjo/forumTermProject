"use strict";
// @ts-nocheck
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
const db = __importStar(require("../fake-db"));
const express_1 = __importDefault(require("express"));
const database = __importStar(require("../controller/postController"));
const checkAuth_1 = require("../middleware/checkAuth");
// In postRouters.ts
const fake_db_1 = require("../fake-db"); // Adjust the path as needed
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
    try {
        const { title, link, description, subgroup } = req.body;
        const creator = req.user.id;
        database.addPost(title, link, creator, description, subgroup);
        res.redirect('/posts');
    }
    catch (error) {
        console.error('Error creating post:', error);
        // Handle the error, maybe render an error page or redirect with an error message
    }
}));
router.get('/show/:postid', checkAuth_1.ensureAuthenticated, (req, res) => {
    const post = db.getPost(req.params.postid);
    res.render('postDetail', { post });
});
router.post('/comment-create/:postid', checkAuth_1.ensureAuthenticated, (req, res) => {
    const { description } = req.body;
    const creatorId = req.user.id; // Assuming you have the user's ID in req.user
    db.addComment(req.params.postid, creatorId, description);
    res.redirect('/posts/show/' + req.params.postid); // Redirect back to the post
});
// GET route for edit post form
router.get('/edit/:postid', checkAuth_1.ensureAuthenticated, (req, res) => {
    const post = db.getPost(req.params.postid);
    if (req.user.id !== post.creator) {
        return res.status(403).send("Unauthorized");
    }
    res.render('editPost', { post });
});
router.post('/edit/:postid', checkAuth_1.ensureAuthenticated, (req, res) => {
    try {
        const { title, link, description, subgroup } = req.body;
        const postId = parseInt(req.params.postid);
        const post = db.getPost(postId);
        if (req.user.id !== post.creator) {
            return res.status(403).send("Unauthorized");
        }
        db.editPost(postId, { title, link, description, subgroup });
        res.redirect('/posts/show/' + postId); // Redirect to a suitable location after editing
    }
    catch (error) {
        console.error('Error updating post:', error);
        res.status(500).send('Internal Server Error');
    }
});
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
router.get('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = getPost(postId);
    if (post) {
        res.render('someView', { post }); // Render the view with the post data
    }
    else {
        res.status(404).send('Post not found');
    }
});
router.get('/edit/:postid', checkAuth_1.ensureAuthenticated, (req, res) => {
    const post = db.getPost(req.params.postid);
    // Check if the logged-in user is the creator of the post
    if (req.user.id !== post.creator) {
        return res.status(403).send("Unauthorized");
    }
    router.get('/create', checkAuth_1.ensureAuthenticated, (req, res) => {
        res.render('createPost'); // Render the createPost.ejs template
    });
    router.post('/create', checkAuth_1.ensureAuthenticated, (req, res) => {
        const { title, link, description, subgroup } = req.body;
        const creatorId = req.user.id; // Assuming you have the user's ID in req.user
        db.addPost(title, link, creatorId, description, subgroup);
        res.redirect('/some-redirect-path'); // Redirect after creating the post
    });
    res.render('editPost', { post }); // Render the editPost.ejs template with post data
});
router.post('/edit/:postid', checkAuth_1.ensureAuthenticated, (req, res) => {
    const { title, link, description, subgroup } = req.body;
    const post = db.getPost(req.params.postid);
    if (req.user.id !== post.creator) {
        return res.status(403).send("Unauthorized");
    }
    db.editPost(req.params.postid, { title, link, description, subgroup });
    res.redirect('/some-redirect-path'); // Redirect to a suitable location
});
router.post('/vote/:postid', checkAuth_1.ensureAuthenticated, (req, res) => {
    const postId = parseInt(req.params.postid);
    const userId = req.user.id; // Assuming you have the user's ID in req.user
    const voteValue = parseInt(req.body.vote); // Expecting '1' for upvote, '-1' for downvote
    db.voteOnPost(postId, userId, voteValue);
    res.redirect('/posts/show/' + postId); // Redirect back to the post
});
// Example usage in postRouters.ts
router.post('/some-route', (req, res) => {
    // ...
    (0, fake_db_1.voteOnPost)(postId, userId, voteValue);
    // ...
});
router.post('/vote/:postId', checkAuth_1.ensureAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // ... async operation ...
        yield (0, fake_db_1.voteOnPost)(postId, userId, voteValue);
        // ... other code ...
    }
    catch (error) {
        // Handle error
        console.error(error);
        res.status(500).send('An error occurred');
    }
}));
router.post('/vote/:postId', (req, res) => {
    const postId = req.params.postId;
    // ... your vote handling logic ...
    // Redirect after handling the vote
    res.redirect(`/posts/show/${postId}`);
});
exports.default = router;
//# sourceMappingURL=postRouters.js.map