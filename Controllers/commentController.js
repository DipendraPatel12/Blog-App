const Comment = require('../Models/Comment.Model.js');
const Post = require('../Models/Post.Model.js');
const User = require('../Models/User.Model.js');

const createComment = async (req, res) => {
    try {
        const { content, author, post } = req.body;

        // Ensure the user exists
        const userExists = await User.findById(author);
        if (!userExists) {
            return res.status(404).send("User not found");
        }

        // Ensure the post exists
        const postExists = await Post.findById(post);
        if (!postExists) {
            return res.status(404).send("Post not found");
        }

        // Create new comment
        const newComment = new Comment({
            content,
            author,
            post
        });

        // Save the comment
        await newComment.save();
        res.status(201).send(newComment);
    } catch (error) {
        console.error('Error creating comment:', error); // Log the error for debugging
        res.status(500).send("Internal Server Error");
    }
};


const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;

        // Find and delete the comment by ID
        const deletedComment = await Comment.findByIdAndDelete(commentId);

        if (!deletedComment) {
            return res.status(404).send("Comment not found");
        }

        res.status(200).send({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

const editComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const updateData = req.body;

        const updatedComment = await Comment.findByIdAndUpdate(commentId, updateData, { new: true });

        if (!updatedComment) {
            return res.status(404).send("Comment not found");
        }

        res.status(200).send(updatedComment);
    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).send("Internal Server Error");
    }
};


const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find().populate('author', 'name').populate('post', 'title');
        res.status(200).send(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).send("Internal Server Error");
    }
};


module.exports = {
    getAllComments,
    editComment,
    deleteComment,
    createComment
};
