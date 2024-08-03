
const Post = require('../Models/Post.Model.js')

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

const createPost = async (req, res) => {
    try {
        // const { title, content, author, createdAt, updatedAt } = req.body;

        // const data = new Post({
        //     title,
        //     content,
        //     author,
        //     createdAt,
        //     updatedAt
        // });

        const data = req.body;

        const postData = new Post(data)
        await postData.save();
        res.status(201).send(postData);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

const editPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const updateData = req.body;

        // Find the post by ID and update it with new data
        const updatedPost = await Post.findByIdAndUpdate(postId, updateData, { new: true });

        if (!updatedPost) {
            return res.status(404).send("Post not found");
        }

        res.status(200).send(updatedPost);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;

        const deletedPost = await Post.findByIdAndDelete(postId);

        if (!deletedPost) {
            return res.status(404).send("Post not found");
        }

        res.status(200).send("Post deleted successfully");
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};


const deleteAllPosts = async (req, res) => {
    try {
        await Post.deleteMany({});
        res.status(200).send({ message: "All posts deleted successfully" });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    createPost,
    editPost,
    getAllPosts,
    deletePost,
    deleteAllPosts
};