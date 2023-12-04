"use strict";
// fake-db.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.voteOnPost = exports.getVotesForPost = exports.addComment = exports.getSubs = exports.deletePost = exports.editPost = exports.addPost = exports.getPost = exports.getPosts = exports.getUserByUsername = exports.getUser = exports.addUser = exports.validateUser = exports.posts = void 0;
const users = {
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
exports.posts = {
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
const comments = [
    {
        id: 1,
        post_id: 101,
        creator: 1, // Change this to the user's ID (a number)
        description: "This is a comment",
        timestamp: 1642691742010,
    },
    // Other comments...
];
let votes = [
    { user_id: 2, post_id: 101, value: +1 },
    { user_id: 3, post_id: 101, value: +1 },
    { user_id: 4, post_id: 101, value: +1 },
    { user_id: 3, post_id: 102, value: -1 },
];
function getUser(id) {
    return users[id];
}
exports.getUser = getUser;
function getUserByUsername(uname) {
    var _a, _b;
    return getUser((_b = (_a = Object.values(users).find((user) => user.uname === uname)) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : 0);
}
exports.getUserByUsername = getUserByUsername;
function getVotesForPost(post_id) {
    return votes.filter((vote) => vote.post_id === post_id);
}
exports.getVotesForPost = getVotesForPost;
function decoratePost(post) {
    var _a, _b;
    const decoratedPost = Object.assign(Object.assign({}, post), { creatorName: (_b = (_a = users[post.creator]) === null || _a === void 0 ? void 0 : _a.uname) !== null && _b !== void 0 ? _b : 'Unknown' });
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
    }
    else {
        decoratedPost.detailedComments = [];
    }
    return decoratedPost;
}
function getPosts(n = 5, sub) {
    let allPosts = Object.values(exports.posts);
    if (sub) {
        allPosts = allPosts.filter(post => post.subgroup === sub);
    }
    allPosts.sort((a, b) => b.timestamp - a.timestamp);
    return allPosts.slice(0, n).map(post => decoratePost(post));
}
exports.getPosts = getPosts;
// In fake-db.ts
function getPost(id) {
    let post = exports.posts[id];
    if (post) {
        return decoratePost(post);
    }
    return undefined;
}
exports.getPost = getPost;
function addPost(title, link, creator, description, subgroup) {
    let id = Math.max(...Object.keys(exports.posts).map(Number)) + 1;
    let post = {
        id,
        title,
        link,
        description,
        creator,
        subgroup,
        timestamp: Date.now(),
        votes: 0, // Ensure this line is included
    };
    exports.posts[id] = post;
    return post;
}
exports.addPost = addPost;
function editPost(post_id, changes = {}) {
    let post = exports.posts[post_id];
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
exports.editPost = editPost;
function deletePost(post_id) {
    delete exports.posts[post_id];
}
exports.deletePost = deletePost;
function getSubs() {
    return Array.from(new Set(Object.values(exports.posts).map((post) => post.subgroup)));
}
exports.getSubs = getSubs;
function addComment(post_id, creator, description) {
    let id = Math.max(...Object.keys(comments).map(Number)) + 1;
    let comment = {
        id,
        post_id,
        creator,
        description,
        timestamp: Date.now(),
    };
    comments[id] = comment;
    return comment;
}
exports.addComment = addComment;
function validateUser(uname, password) {
    const user = Object.values(users).find((user) => user.uname === uname);
    return user && user.password === password ? user : null;
}
exports.validateUser = validateUser;
// Assuming you have a users object
const addUser = (uname, password) => {
    const userId = Object.keys(users).length + 1;
    users[userId] = { id: userId, uname, password };
};
exports.addUser = addUser;
function voteOnPost(post_id, user_id, value) {
    // Check if the user has already voted on the post
    const existingVote = votes.find(vote => vote.user_id === user_id && vote.post_id === post_id);
    if (existingVote) {
        // Update the existing vote if it's different
        if (existingVote.value !== value) {
            existingVote.value = value;
        }
        else {
            // Remove the vote if it's the same (unvote)
            // Assuming 'votes' is an array of vote objects
            votes = votes.filter(vote => !(vote.user_id === user_id && vote.post_id === post_id));
        }
    }
    else {
        // Add a new vote
        votes.push({ user_id, post_id, value });
    }
    // Recalculate the total votes for the post
    const postVotes = votes.filter(vote => vote.post_id === post_id);
    const totalVotes = postVotes.reduce((acc, vote) => acc + vote.value, 0);
    // Update the post's vote count
    const post = exports.posts[post_id];
    if (post) {
        post.votes = totalVotes;
    }
}
exports.voteOnPost = voteOnPost;
//# sourceMappingURL=fake-db.js.map