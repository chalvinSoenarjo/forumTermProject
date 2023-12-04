import express from "express";
import * as db from "../fake-db";

const router = express.Router();

router.get('/list', (req, res) => {
  let subgroups = new Set();
  Object.values(db.posts).forEach(post => subgroups.add(post.subgroup)); // Use db.posts
  
  res.render('subgroupsList', { subgroups: Array.from(subgroups) });
});

router.get("/show/:subname", async (req, res) => {
  const subname = req.params.subname;
  const posts = db.getPosts(20, subname); // This assumes db.getPosts can filter by subgroup
  res.render("subPosts", { posts });
});

// Removed the duplicate route for '/show/:subname'

export default router;
