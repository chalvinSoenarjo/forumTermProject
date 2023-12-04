"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decoratePost = exports.addComment = exports.getSubs = exports.deletePost = exports.editPost = exports.addPost = exports.getPost = exports.getPosts = exports.getUserByUsername = exports.getUser = exports.debug = void 0;
// @ts-nocheck
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
const posts = {
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
};
const comments = {
    9001: {
        id: 9001,
        post_id: 102,
        creator: 1,
        description: "Actually I learned a lot :pepega:",
        timestamp: 1642691742010,
    },
};
const votes = [
    { user_id: 2, post_id: 101, value: +1 },
    { user_id: 3, post_id: 101, value: +1 },
    { user_id: 4, post_id: 101, value: +1 },
    { user_id: 3, post_id: 102, value: -1 },
];
function debug() {
    console.log("==== DB DEBUGING ====");
    console.log("users", users);
    console.log("posts", posts);
    console.log("comments", comments);
    console.log("votes", votes);
    console.log("==== DB DEBUGING ====");
}
exports.debug = debug;
function getUser(id) {
    return users[id];
}
exports.getUser = getUser;
function getUserByUsername(uname) {
    return getUser(Object.values(users).filter((user) => user.uname === uname)[0].id);
}
exports.getUserByUsername = getUserByUsername;
function getVotesForPost(post_id) {
    return votes.filter((vote) => vote.post_id === post_id);
}
function decoratePost(post) {
    post = Object.assign(Object.assign({}, post), { creator: users[post.creator], votes: getVotesForPost(post.id), comments: Object.values(comments)
            .filter((comment) => comment.post_id === post.id)
            .map((comment) => (Object.assign(Object.assign({}, comment), { creator: users[comment.creator] }))) });
    return post;
}
exports.decoratePost = decoratePost;
/**
 * @param {*} n how many posts to get, defaults to 5
 * @param {*} sub which sub to fetch, defaults to all subs
 */
function getPosts(n = 5, sub = undefined) {
    let allPosts = Object.values(posts);
    if (sub) {
        allPosts = allPosts.filter((post) => post.subgroup === sub);
    }
    allPosts.sort((a, b) => b.timestamp - a.timestamp);
    return allPosts.slice(0, n);
}
exports.getPosts = getPosts;
function getPost(id) {
    return decoratePost(posts[id]);
}
exports.getPost = getPost;
function addPost(title, link, creator, description, subgroup) {
    let id = Math.max(...Object.keys(posts).map(Number)) + 1;
    let post = {
        id,
        title,
        link,
        description,
        creator: Number(creator),
        subgroup,
        timestamp: Date.now(),
    };
    posts[id] = post;
    return post;
}
exports.addPost = addPost;
function editPost(post_id, changes = {}) {
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
exports.editPost = editPost;
function deletePost(post_id) {
    delete posts[post_id];
}
exports.deletePost = deletePost;
function getSubs() {
    return Array.from(new Set(Object.values(posts).map((post) => post.subgroup)));
}
exports.getSubs = getSubs;
function addComment(post_id, creator, description) {
    let id = Math.max(...Object.keys(comments).map(Number)) + 1;
    let comment = {
        id,
        post_id: Number(post_id),
        creator: Number(creator),
        description,
        timestamp: Date.now(),
    };
    comments[id] = comment;
    return comment;
}
exports.addComment = addComment;
//# sourceMappingURL=fake-db.js.map