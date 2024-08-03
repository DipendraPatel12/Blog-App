const express = require('express');
const router = express.Router();
const { deleteComment, editComment } = require('../Controllers/commentController.js');
const { createComment, getAllComments } = require('../Controllers/commentController.js');

router.post('/comment',createComment)
router.delete('/comments/:id', deleteComment);
router.put("/comment/:id",editComment)
router.get('/comments', getAllComments);

module.exports = router;
