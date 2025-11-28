const User = require("../models/User");
const jwt = require("jsonwebtoken");
const emailService = require("../utils/emailService");
const VerificationToken = require("../models/verificationToken");

const crypto=require('crypto');
// const verificationToken = require("../models/verificationToken");

// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// REGISTER
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role)
            return res.status(400).json({ message: "All fields are required" });

        const userExists = await User.findOne({ email });
        if (userExists)
            return res.status(400).json({ message: "Email already exists" });

        const user = await User.create({ name, email, password, role, profileCompleted: false,isVerified:false });
        await emailService.sendWelcomeMessage(email, name);
        // res.status(201).json({
        //     message: "User registered successfully",
        //     token: generateToken(user._id),
        //     user: {
        //         id: user._id,
        //         name: user.name,
        //         email: user.email,
        //         role: user.role,
        //         profileCompleted: user.profileCompleted ,
        //         isVerified: false,
        //     }
        // });
        // Create verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        await VerificationToken.create({
            userId: user._id,
            token: verificationToken
        });
        const verifyUrl=`http://localhost:5173/verify-email?token=${verificationToken}`;
        await emailService.sendVerificationEmail(user.email,user.name,verifyUrl);
        res.status(201).json({ message: "User registered successfully. Please check your email to verify your account.",
            userId:user._id
         });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// LOGIN
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "User not found" });

        if(!user.isVerified)
        {
            return res
                .status(401)
                .json({ message: "Please verify your email before logging in." });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid password" });

        res.json({
            message: "Login successful",
            token: generateToken(user._id),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profileCompleted: user.profileCompleted
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMe = async (req, res) => {
    res.json(req.user);
};


exports.verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;
    const record = await VerificationToken.findOne({ token });

    if (!record)
      return res.status(400).json({ message: "Invalid or expired token" });

    const user = await User.findById(record.userId);
    if (!user)
      return res.status(404).json({ message: "User not found" });

    user.isVerified = true;
    await user.save();

    await VerificationToken.deleteOne({ _id: record._id });

    res.json({ message: "Email verified successfully" });

    return res.redirect("http://localhost:5173/verify-success");

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

