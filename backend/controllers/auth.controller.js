import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        const { name, username, password } = req.body;

        if (!name || !username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            password: hashedPassword
        });

        await user.save();

        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.cookie("jwt-inventoryManagement", token, {
            httpOnly: true, // prevent XSS attack
            maxAge: 1 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",  // prevents man-in-the-middle attacks
        });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log("Error in signup: ", erorr.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalide credentials" });
        }

        // create and send token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.cookie("jwt-inventoryManagement", token, {
            httpOnly: true, // prevent XSS attack
            maxAge: 1 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",  // prevents man-in-the-middle attacks
        });

        res.status(201).json({ message: "Logged in successfully" });
    } catch (error) {
        console.error("Error in login controller:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const logout = (req, res) => {
    res.clearCookie("jwt-inventoryManagement");
    res.json({ message: "Logged out successfully" });
};

export const getCurrentUser = async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        console.error("Error in getCurrentUser controller:", error);
        res.status(500).json({ message: "Server error" });
    }
};