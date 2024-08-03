const express = require('express');
const connectDB = require('./db.js');
const postRoutes = require('./routes/postRoutes.js');
const authRoutes = require('./routes/authRoutes.js')
const commentRoutes = require('./routes/commentRoutes.js')
const authMiddleware = require('./Middlewere/authMiddleware.js')
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json()); // This replaces bodyParser.json()

// Connect to the database
connectDB();

// Use routes
app.get('/', (req, res) => {
    res.send("hiii")
})
app.use('/api', postRoutes);
app.use('/api', authRoutes)
app.use('/api',commentRoutes);
app.get('/person', authMiddleware, (req, res) => {
    console.log("hii i am a person");
    res.send("hera i amm")
})

// Start the server
app.listen(4000, (req, res) => {

    console.log("Server is running on port 4000",);
});
