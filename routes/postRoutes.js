const express = require('express');
const router = express.Router();
const { createPost, editPost, getAllPosts, deletePost , deleteAllPosts} = require('../Controllers/postController.js');

// Route for creating a new post
router.post('/posts', createPost);

// Route for editing an existing post
router.put('/posts/:id', editPost);

// Route for getting all posts
router.get('/posts', getAllPosts);

router.delete('/posts/:id', deletePost);

router.delete('/posts', deleteAllPosts);

module.exports = router;
