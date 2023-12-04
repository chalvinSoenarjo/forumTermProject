 import * as db from "../fake-db";

 let posts = {}; // Assuming posts are stored in an object keyed by post ID


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

// Function to generate a unique ID for a new post (simple implementation)
function generatePostId(): number {
  return Math.max(0, ...Object.keys(db.posts).map(Number)) + 1;
}



// addPost function implementation
export const addPost = (title: string, link: string, creator: number, description: string, subgroup: string) => {
  const postId = generatePostId();
  const newPost: Post = {
      id: postId,
      title,
      link,
      description,
      creator,
      subgroup,
      timestamp: Date.now(), // Adding a timestamp for the post
  };

  // Add the new post to the db.posts object
  db.posts[postId] = newPost;
};

// Function to get a single post by ID
export function getPost(id: number): Post | undefined {
  return db.posts[id];  // Retrieve the post with the given ID from the database
}

