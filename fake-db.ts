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
  creatorName?: string; // Add this line
  subgroup: string;
  timestamp: number;
  comments?: Comment[]; // Detailed comments
  detailedComments?: Comment[]; // Add this line
  votes: number;



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





export let posts: Record<number, Post> = {
  101: {
    id: 101,
    title: "Mochido opens its new location in Coquitlam this week",
    link: "https://dailyhive.com/vancouver/mochido-coquitlam-open",
    description: "New mochi donut shop, Mochido, is set to open later this week.",
    creator: 1,
    subgroup: "food",
    timestamp: 1643648446955,
    votes: 0, // Add this line
  },
  102: {
    id: 102,
    title: "2023 State of Databases for Serverless & Edge",
    link: "https://leerob.io/blog/backend",
    description: "An overview of databases that pair well with modern application and compute providers.",
    creator: 4,
    subgroup: "coding",
    timestamp: 1642611742010,
    votes: 0, // Add this line
  },

  103: {
    id: 103,
    title: "pixel*",
    link: "https://leerob.io/blog/backend",
    description: "new pixel 8 coming.",
    creator: 4,
    subgroup: "technology",
    timestamp: 1642611742023,
    votes: 0, // Add this line
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



let votes: Vote[] = [
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
    creatorName: users[post.creator]?.uname ?? 'Unknown',
  };

  if (post.comments) {
    decoratedPost.detailedComments = post.comments
      .filter(commentId => typeof commentId === 'number')
      .flatMap(commentId => {
        // Ensure commentId is numeric
        const numericCommentId = Number(commentId);
        if (isNaN(numericCommentId)) {
          return [];
        }

        const comment = comments.find(comment => comment.id === numericCommentId);
        return comment ? [comment] : [];
      });
  } else {
    decoratedPost.detailedComments = [];
  }

  return decoratedPost;
}
















function getPosts(n: number = 5, sub?: string): Post[] {
  let allPosts = Object.values(posts);
  if (sub) {
    allPosts = allPosts.filter(post => post.subgroup === sub);
  }
  allPosts.sort((a, b) => b.timestamp - a.timestamp);
  return allPosts.slice(0, n).map(post => decoratePost(post));
}

// In fake-db.ts

function getPost(id: number): Post | undefined {
  let post = posts[id];
  if (post) {
    return decoratePost(post);
  }
  return undefined;
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
    votes: 0, // Ensure this line is included
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

// Assuming you have a users object


export const addUser = (uname: string, password: string) => {
  const userId = Object.keys(users).length + 1;
  users[userId] = { id: userId, uname, password };
};

export function voteOnPost(postId: number, userId: number, value: number) {
  // Assuming you have an array 'votes' storing each vote as { user_id, post_id, value }
  let existingVote = votes.find(vote => vote.user_id === userId && vote.post_id === postId);

  if (existingVote) {
    // User already voted on this post
    if (existingVote.value === value) {
      // User is repeating the same vote, consider this as unvote
      votes = votes.filter(vote => !(vote.user_id === userId && vote.post_id === postId));
    } else {
      // User is changing their vote
      existingVote.value = value;
    }
  } else {
    // This is a new vote
    votes.push({ user_id: userId, post_id: postId, value: value });
  }

  // Update the post's vote count
  const postVotes = votes.filter(vote => vote.post_id === postId);
  const totalVotes = postVotes.reduce((acc, vote) => acc + vote.value, 0);

  // Assuming you have a posts object where each post is stored with its ID as the key
  const post = posts[postId];
  if (post) {
    post.votes = totalVotes;
  } else {
    throw new Error("Post not found");
  }

  // Return the updated post
  return post;
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
