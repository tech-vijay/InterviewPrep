import User from "../models/user-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  let token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
  return token;
};

// register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("📝 Signup attempt:", { name, email });

    if (!name || !email || !password) {
      console.log("❌ Missing fields");
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      console.log("❌ User already exists:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("✅ User created:", user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("🔥 Signup Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🔐 Login attempt:", email);

    const user = await User.findOne({ email });
    console.log("👤 User found:", user ? "Yes" : "No");

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log("🔑 Password match:", passwordMatch);

      if (passwordMatch) {
        console.log("✅ Login successful");
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        });
      } else {
        console.log("❌ Password mismatch");
        res.status(401).json({ message: "Invalid email or password" });
      }
    } else {
      console.log("❌ User not found");
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("🔥 Login Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};