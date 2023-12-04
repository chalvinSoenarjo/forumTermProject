"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosts = exports.getSubs = void 0;
const db = __importStar(require("../fake-db"));
// Function to get a list of all subgroups
function getSubs() {
    const subgroups = new Set();
    Object.values(db.posts).forEach((post) => {
        subgroups.add(post.subgroup);
    });
    return Array.from(subgroups);
}
exports.getSubs = getSubs;
// Function to get posts, optionally filtered by a subgroup
function getPosts(n, sub) {
    let allPosts = Object.values(db.posts);
    if (sub) {
        allPosts = allPosts.filter((post) => post.subgroup === sub);
    }
    allPosts.sort((a, b) => b.timestamp - a.timestamp);
    return allPosts.slice(0, n);
}
exports.getPosts = getPosts;
// Add other necessary functions here (e.g., addPost, getPost, etc.)
// Make sure to export them
//# sourceMappingURL=postController.js.map