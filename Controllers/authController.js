const User = require('../Models/User.Model');
const bcrypt = require('bcrypt');
const { generateRefreshToken, generateAccessToken } = require('../Utils/generateTokens');

const registerUser = async (req, res) => {
    try {
        const { username, email, password, avatar, isadmin } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please fill all required fields: username, email, password" });
        }

        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const rounds = 10;
        const hashedPassword = await bcrypt.hash(password, rounds);
        const userData = { username, email, password: hashedPassword, avatar, isadmin };
        const user = new User(userData);

        await user.save();

        const token = generateAccessToken(email);
        
        return res.status(201).json({response:user,token:token});
    } catch (err) {
        console.error("Internal server error4:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all required fields: email and password" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshToken = refreshToken;
        await user.save();

        return res.status(200).json({ accessToken, refreshToken, message: "User is logged in" });
        
    } catch (err) {
        console.error("Internal server error:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};



module.exports = {
    registerUser,
    loginUser
};
