// @ts-nocheck
import express from "express";
import * as database from "../controller/postController";

import { ensureAuthenticated } from "../middleware/checkAuth";

import * as postController from "../controller/postController";

const router = express.Router();

// List posts
router.get("/", async (req, res) => {
  const posts = await database.getPosts(20);
  const user = req.user;
  res.render("posts", { posts, user });
});

// Create post form
router.get("/create", ensureAuthenticated, (req, res) => {
  res.render("createPosts");
});

// Handle post creation
router.post("/create", ensureAuthenticated, async (req, res) => {
  const { title, link, description, subgroup } = req.body;
  const creator = req.user.id;
  database.addPost(title, link, creator, description, subgroup);
  res.redirect('/posts');
});

// Display individual post
router.get("/show/:postid", async (req, res) => {
  const post = database.getPost(req.params.postid);
  res.render("individualPost", { post });
});

// Edit post form
router.get("/edit/:postid", ensureAuthenticated, async (req, res) => {
  const post = database.getPost(req.params.postid);
  if (req.user.id !== post.creator.id) {
    return res.status(403).send("Unauthorized");
  }
  res.render("editPost", { post });
});

// Handle post editing
router.post("/edit/:postid", ensureAuthenticated, async (req, res) => {
  const { title, link, description, subgroup } = req.body;
  database.editPost(req.params.postid, { title, link, description, subgroup });
  res.redirect(`/posts/show/${req.params.postid}`);
});

// Confirm delete post
router.get("/deleteconfirm/:postid", ensureAuthenticated, async (req, res) => {
  const post = database.getPost(req.params.postid);
  if (req.user.id !== post.creator.id) {
    return res.status(403).send("Unauthorized");
  }
  res.render("deletePostConfirm", { post });
});

// Handle post deletion
router.post("/delete/:postid", ensureAuthenticated, async (req, res) => {
  database.deletePost(req.params.postid);
  res.redirect('/posts');
});

// Handle comment creation
router.post("/comment-create/:postid", ensureAuthenticated, async (req, res) => {
  const { description } = req.body;
  const creator = req.user.id;
  database.addComment(req.params.postid, creator, description);
  res.redirect(`/posts/show/${req.params.postid}`);
});

export default router;