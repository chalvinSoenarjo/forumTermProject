// fake-db.ts

// fake-db.ts

interface User {
  id: number;
  uname: string;
  password: string;
}

interface Post {
  id: number;
  title: string;
  link: string;
  description: string;
  creator: number;
  subgroup: string;
  timestamp: number;
  comments?: Comment[]; // Make the comments property optional


}


interface Comment {
  id: number;
  post_id: number;
  creator: number;
  description: string;
  timestamp: number;
}

interface Vote {
  user_id: number;
  post_id: number;
  value: number;
}

const users: Record<number, User> = {
  1: {
    id: 1,
    uname: "alice",
    password: "alpha",
  },
  2: {
    id: 2,
    uname: "theo",
    password: "123",
  },
  3: {
    id: 3,
    uname: "prime",
    password: "123",
  },
  4: {
    id: 4,
    uname: "leerob",
    password: "123",
  },
};

export const posts: Record<number, Post> = {
  101: {
    id: 101,
    title: "Mochido opens its new location in Coquitlam this week",
    link: "https://dailyhive.com/vancouver/mochido-coquitlam-open",
    description: "New mochi donut shop, Mochido, is set to open later this week.",
    creator: 1,
    subgroup: "food",
    timestamp: 1643648446955,
  },
  102: {
    id: 102,
    title: "2023 State of Databases for Serverless & Edge",
    link: "https://leerob.io/blog/backend",
    description: "An overview of databases that pair well with modern application and compute providers.",
    creator: 4,
    subgroup: "coding",
    timestamp: 1642611742010,
  },

  103: {
    id: 103,
    title: "pixel*",
    link: "https://leerob.io/blog/backend",
    description: "new pixel 8 coming.",
    creator: 4,
    subgroup: "technology",
    timestamp: 1642611742023,
  },
};


// const comments: Record<number, Comment> = {
//   9001: {
//     id: 9001,
//     post_id: 102,
//     creator: 1,
//     description: "Actually I learned a lot :pepega:",
//     timestamp: 1642691742010,
//   },
// };

const comments: Comment[] = [
  {
    id: 1,
    post_id: 101,
    creator: 1, // Change this to the user's ID (a number)
    description: "This is a comment",
    timestamp: 1642691742010,
  },
  // Other comments...
];



const votes: Vote[] = [
  { user_id: 2, post_id: 101, value: +1 },
  { user_id: 3, post_id: 101, value: +1 },
  { user_id: 4, post_id: 101, value: +1 },
  { user_id: 3, post_id: 102, value: -1 },
];

function getUser(id: number): User | undefined {
  return users[id];
}

function getUserByUsername(uname: string): User | undefined {
  return getUser(Object.values(users).find((user) => user.uname === uname)?.id ?? 0);

}

function getVotesForPost(post_id: number): Vote[] {
  return votes.filter((vote) => vote.post_id === post_id);
}

function decoratePost(post: Post): Post {
  const decoratedPost: Post = {
    ...post,
    creator: users[post.creator]?.id ?? 0,
    comments: [], // Initialize comments as an empty array

  };

  // Filter and map comments that match the post's ID
  decoratedPost.comments = Object.values(comments)
    .filter((comment) => comment.post_id === post.id)
    .map((comment) => ({
      ...comment,
      creator: users[comment.creator]?.id ?? 0, // Update the creator to match User ID
    }));

  return decoratedPost;
}


 function getPosts(n: number = 5, sub?: string): Post[] {
  let allPosts = Object.values(posts);
  if (sub) {
    allPosts = allPosts.filter((post) => post.subgroup === sub);
  }
  allPosts.sort((a, b) => b.timestamp - a.timestamp);
  return allPosts.slice(0, n);
}

function getPost(id: number): Post | undefined {
  return decoratePost(posts[id]);
}

function addPost(title: string, link: string, creator: number, description: string, subgroup: string): Post {
  let id = Math.max(...Object.keys(posts).map(Number)) + 1;
  let post: Post = {
    id,
    title,
    link,
    description,
    creator,
    subgroup,
    timestamp: Date.now(),
  };
  posts[id] = post;
  return post;
}

function editPost(post_id: number, changes: Partial<Post> = {}): void {
  let post = posts[post_id];
  if (changes.title) {
    post.title = changes.title;
  }
  if (changes.link) {
    post.link = changes.link;
  }
  if (changes.description) {
    post.description = changes.description;
  }
  if (changes.subgroup) {
    post.subgroup = changes.subgroup;
  }
}

function deletePost(post_id: number): void {
  delete posts[post_id];
}

function getSubs(): string[] {
  return Array.from(new Set(Object.values(posts).map((post) => post.subgroup)));
}

function addComment(post_id: number, creator: number, description: string): Comment {
  let id = Math.max(...Object.keys(comments).map(Number)) + 1;
  let comment: Comment = {
    id,
    post_id,
    creator,
    description,
    timestamp: Date.now(),
  };
  comments[id] = comment;
  return comment;
}

export function validateUser(uname: string, password: string): User | null {
  const user = Object.values(users).find((user) => user.uname === uname);
  return user && user.password === password ? user : null;
}

export {
  getUser,
  getUserByUsername,
  getPosts,
  getPost,
  addPost,
  editPost,
  deletePost,
  getSubs,
  addComment,
  getVotesForPost,
};
