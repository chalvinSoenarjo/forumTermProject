 import * as db from "../fake-db";




// Define an interface for a post
interface Post {
  id: number;
  title: string;
  link: string;
  description: string;
  creator: number;
  subgroup: string;
  timestamp: number;
}

// Function to get a list of all subgroups
export function getSubs() {
  const subgroups = new Set<string>();
  Object.values(db.posts).forEach((post: Post) => {
    subgroups.add(post.subgroup);
  });
  return Array.from(subgroups);
}

// Function to get posts, optionally filtered by a subgroup
export function getPosts(n: number, sub?: string) {
  let allPosts: Post[] = Object.values(db.posts);

  if (sub) {
    allPosts = allPosts.filter((post: Post) => post.subgroup === sub);
  }

  allPosts.sort((a: Post, b: Post) => b.timestamp - a.timestamp);
  return allPosts.slice(0, n);
}

// Add other necessary functions here (e.g., addPost, getPost, etc.)
// Make sure to export them

