// @ts-nocheck

import * as db from '../fake-db';
import express from "express";
import * as database from "../controller/postController";

import { ensureAuthenticated } from "../middleware/checkAuth";

import * as postController from "../controller/postController";

// In postRouters.ts
import { voteOnPost } from '../fake-db'; // Adjust the path as needed


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
  try {
    const { title, link, description, subgroup } = req.body;
    const creator = req.user.id;
    database.addPost(title, link, creator, description, subgroup);
    res.redirect('/posts');
  } catch (error) {
    console.error('Error creating post:', error);
    // Handle the error, maybe render an error page or redirect with an error message
  }
});

router.get('/show/:postid', ensureAuthenticated, (req, res) => {
  const post = db.getPost(req.params.postid);
  res.render('postDetail', { post });
});

router.post('/comment-create/:postid', ensureAuthenticated, (req, res) => {
  const { description } = req.body;
  const creatorId = req.user.id; // Assuming you have the user's ID in req.user

  db.addComment(req.params.postid, creatorId, description);
  res.redirect('/posts/show/' + req.params.postid); // Redirect back to the post
});


// GET route for edit post form
router.get('/edit/:postid', ensureAuthenticated, (req, res) => {
  const post = db.getPost(req.params.postid);

  if (req.user.id !== post.creator) {
    return res.status(403).send("Unauthorized");
  }

  res.render('editPost', { post });
});



router.post('/edit/:postid', ensureAuthenticated, (req, res) => {

  try {
    const { title, link, description, subgroup } = req.body;
    const postId = parseInt(req.params.postid);

    const post = db.getPost(postId);
    if (req.user.id !== post.creator) {
      return res.status(403).send("Unauthorized");
    }

    db.editPost(postId, { title, link, description, subgroup });
    res.redirect('/posts/show/' + postId); // Redirect to a suitable location after editing
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).send('Internal Server Error');
  }
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

router.get('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = getPost(postId);
  if (post) {
    res.render('someView', { post });  // Render the view with the post data
  } else {
    res.status(404).send('Post not found');
  }
});

router.get('/edit/:postid', ensureAuthenticated, (req, res) => {
  const post = db.getPost(req.params.postid);

  // Check if the logged-in user is the creator of the post
  if (req.user.id !== post.creator) {
    return res.status(403).send("Unauthorized");
  }

  router.get('/create', ensureAuthenticated, (req, res) => {
    res.render('createPost'); // Render the createPost.ejs template
  });

  router.post('/create', ensureAuthenticated, (req, res) => {
    const { title, link, description, subgroup } = req.body;
    const creatorId = req.user.id; // Assuming you have the user's ID in req.user

    db.addPost(title, link, creatorId, description, subgroup);
    res.redirect('/some-redirect-path'); // Redirect after creating the post
  });


  res.render('editPost', { post }); // Render the editPost.ejs template with post data
});

router.post('/edit/:postid', ensureAuthenticated, (req, res) => {
  const { title, link, description, subgroup } = req.body;

  const post = db.getPost(req.params.postid);
  if (req.user.id !== post.creator) {
    return res.status(403).send("Unauthorized");
  }

  db.editPost(req.params.postid, { title, link, description, subgroup });
  res.redirect('/some-redirect-path'); // Redirect to a suitable location
});

router.post('/vote/:postid', ensureAuthenticated, (req, res) => {
  const postId = parseInt(req.params.postid);
  const userId = req.user.id; // Assuming you have the user's ID in req.user
  const voteValue = parseInt(req.body.vote); // Expecting '1' for upvote, '-1' for downvote

  db.voteOnPost(postId, userId, voteValue);

  res.redirect('/posts/show/' + postId); // Redirect back to the post
});

// Example usage in postRouters.ts
router.post('/some-route', (req, res) => {
  // ...
  voteOnPost(postId, userId, voteValue);
  // ...
});


router.post('/vote/:postId', ensureAuthenticated, async (req, res) => {
  try {
    // ... async operation ...
    await voteOnPost(postId, userId, voteValue);
    // ... other code ...
  } catch (error) {
    // Handle error
    console.error(error);
    res.status(500).send('An error occurred');
  }
});


router.post('/vote/:postId', (req, res) => {
  const postId = req.params.postId;
  // ... your vote handling logic ...

  // Redirect after handling the vote
  res.redirect(`/posts/show/${postId}`);
});
export default router;