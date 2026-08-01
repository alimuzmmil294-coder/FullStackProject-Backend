import jwt from "jsonwebtoken";
import { User } from "../modals/user.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      authProvider,
      googleId,
      avatar,
      role,
      shopName,
    } = req.body;

    const isExist = await User.findOne({ email: email });

    if (isExist) {
      throw new Error("User already exists...");
    }

    if (authProvider === "GOOGLE") {
      const newUser = await User.create({
        username,
        email,
        password,
        authProvider,
        googleId,
        avatar,
        role,
        shopName: role === "SELLER" ? shopName : undefined,
      });
      res.status(201).json({
        message: "User created successfully...",
        success: true,
        user: newUser,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
      shopName: role === "SELLER" ? shopName : undefined,
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        // sameSite: "strict",
        maxAge: 3600000, // 1 hour
      })
      .status(201)
      .json({
        message: "User created successfully",
        user: {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
          shopName: newUser.shopName,
        },
      });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password, authProvider, googleId, avatar } = req.body;

    const isExist = await User.findOne({ email });
    if (!isExist) {
      throw new Error("Invalid credentials...");
    }

    const provider = authProvider || "LOCAL";

    if (provider === "GOOGLE") {
      if (!googleId) {
        throw new Error("Google Id is requried...");
      }

      if (isExist.authProvider !== "GOOGLE") {
        isExist.authProvider = "GOOGLE";
        isExist.googleId = googleId;
        if (avatar) isExist.avatar = avatar;
        await isExist.save();
      }
    } else {
      if (isExist.authProvider !== "LOCAL") {
        throw new Error(
          "This email is registered using Google, please log in with Google!",
        );
      }

      if (!password) {
        throw new Error("Password is required for local Login...");
      }

      const isPasswordValid = await bcrypt.compare(password, isExist.password);

      if (!isPasswordValid) {
        throw new Error("Invalid credentials...");
      }
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: isExist._id,
        username: isExist.username,
        email: isExist.email,
        role: isExist.role,
        shopName: isExist.shopName,
        authProvider: isExist.authProvider,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};
