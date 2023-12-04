import express from "express";
import * as db from "../fake-db";

const router = express.Router();

router.get("/list", async (req, res) => {
  const subs = db.getSubs();
  res.render("subsList", { subs });
});

router.get("/show/:subname", async (req, res) => {
  const subname = req.params.subname;
  const posts = db.getPosts(20, subname);
  res.render("subPosts", { posts });
});

export default router;