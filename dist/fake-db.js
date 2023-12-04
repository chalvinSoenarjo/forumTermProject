"use strict";
// fake-db.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVotesForPost = exports.addComment = exports.getSubs = exports.deletePost = exports.editPost = exports.addPost = exports.getPost = exports.getPosts = exports.getUserByUsername = exports.getUser = exports.validateUser = exports.posts = void 0;
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
const votes = [
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
    const decoratedPost = Object.assign(Object.assign({}, post), { creator: (_b = (_a = users[post.creator]) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : 0, comments: [] });
    // Filter and map comments that match the post's ID
    decoratedPost.comments = Object.values(comments)
        .filter((comment) => comment.post_id === post.id)
        .map((comment) => {
        var _a, _b;
        return (Object.assign(Object.assign({}, comment), { creator: (_b = (_a = users[comment.creator]) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : 0 }));
    });
    return decoratedPost;
}
function getPosts(n = 5, sub) {
    let allPosts = Object.values(exports.posts);
    if (sub) {
        allPosts = allPosts.filter((post) => post.subgroup === sub);
    }
    allPosts.sort((a, b) => b.timestamp - a.timestamp);
    return allPosts.slice(0, n);
}
exports.getPosts = getPosts;
function getPost(id) {
    return decoratePost(exports.posts[id]);
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
//# sourceMappingURL=fake-db.js.map