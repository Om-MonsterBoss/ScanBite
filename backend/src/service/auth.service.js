import User from "../models/DBResModels/User.model.js";
import welcomeQueue from "../queues/worker.queue.js";
import { authProvider } from "../utils/provider.js";
import { generateTokenPair, verifyRefreshToken } from "../utils/token.js";
import bcrypt from "bcrypt";

const sanitizeUser = (user) => ({
  _id: user._id,
  fullName: user.fullName,
  email: user.email,
  role: user.role,
  authProvider: user.authProvider,
  lastLoginAt: user.lastLoginAt,
});

export const signupService = async (userData) => {
  const { fullName, email, password } = userData;

  const normalizedEmail = email?.trim().toLowerCase();

  if (!fullName || !normalizedEmail || !password) {
    return {
      success: false,
      message: "Full name, email and password are required",
    };
  }

  const userExist = await User.findOne({ email: normalizedEmail });

  if (userExist) {
    return {
      success: false,
      message: "User already exists with this email",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    fullName,
    email: normalizedEmail,
    passwordHash: hashedPassword,
    authProvider: authProvider.local,
  });

  const tokenPair = generateTokenPair(newUser);
  newUser.refreshToken = tokenPair.refreshToken;
  newUser.lastLoginAt = new Date();

  await newUser.save();

  await welcomeQueue.add("welcome-email", {
    name: newUser.fullName,
    email: newUser.email,
  }).catch((error) => {
    console.error("Welcome email queue error:", error.message);
  });

  return {
    success: true,
    message: "Signup successful",
    accessToken: tokenPair.accessToken,
    refreshToken: tokenPair.refreshToken,
    user: sanitizeUser(newUser),
  };
};

export const loginService = async ({ email, password }) => {
  const normalizedEmail = email?.trim().toLowerCase();

  if (!normalizedEmail || !password) {
    return {
      success: false,
      message: "Email and password are required",
    };
  }

  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash || "");

  if (!isPasswordValid) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  const tokenPair = generateTokenPair(user);
  user.refreshToken = tokenPair.refreshToken;
  user.lastLoginAt = new Date();

  await user.save();

  return {
    success: true,
    message: "Login successful",
    accessToken: tokenPair.accessToken,
    refreshToken: tokenPair.refreshToken,
    user: sanitizeUser(user),
  };
};

export const logoutService = async (userId, refreshTokenValue) => {
  const user = await User.findById(userId);

  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }

  if (refreshTokenValue && user.refreshToken && user.refreshToken !== refreshTokenValue) {
    return {
      success: false,
      message: "Session mismatch",
    };
  }

  user.refreshToken = null;
  await user.save();

  return {
    success: true,
    message: "Logout successful",
  };
};

export const refreshSessionService = async (refreshTokenValue) => {
  if (!refreshTokenValue) {
    return {
      success: false,
      message: "Refresh token is required",
    };
  }

  try {
    const decoded = verifyRefreshToken(refreshTokenValue);
    const user = await User.findById(decoded.id);

    if (!user || !user.refreshToken || user.refreshToken !== refreshTokenValue) {
      return {
        success: false,
        message: "Invalid or expired session",
      };
    }

    const tokenPair = generateTokenPair(user);
    user.refreshToken = tokenPair.refreshToken;
    await user.save();

    return {
      success: true,
      message: "Session refreshed",
      accessToken: tokenPair.accessToken,
      refreshToken: tokenPair.refreshToken,
      user: sanitizeUser(user),
    };
  } catch (error) {
    return {
      success: false,
      message: "Invalid or expired session",
    };
  }
};

export const getSessionService = async (userId) => {
  const user = await User.findById(userId).select("-passwordHash");

  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }

  return {
    success: true,
    user: sanitizeUser(user),
  };
};