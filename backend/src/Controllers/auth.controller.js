import {
  getSessionService,
  loginService,
  logoutService,
  refreshSessionService,
  signupService,
} from "../service/auth.service.js";

const getRefreshTokenFromRequest = (req) => {
  const cookieHeader = req.headers.cookie || "";
  const cookie = cookieHeader
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith("refreshToken="));

  if (!cookie) {
    return req.body?.refreshToken || req.headers["x-refresh-token"] || null;
  }

  return decodeURIComponent(cookie.split("=")[1]);
};

const setRefreshTokenCookie = (res, token) => {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

const clearRefreshTokenCookie = (res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "Lax",
    path: "/",
  });
};

export const signupController = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Something is missing please check it out",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password should be at least 6 characters long",
      });
    }

    const userResponse = await signupService({ fullName, email, password });

    if (userResponse.success) {
      setRefreshTokenCookie(res, userResponse.refreshToken);

      return res.status(201).json({
        success: true,
        message: userResponse.message,
        accessToken: userResponse.accessToken,
        user: userResponse.user,
      });
    }

    return res.status(400).json({
      success: false,
      message: userResponse.message,
    });
  } catch (err) {
    console.error("Signup controller error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const loginController = async (req, res) => {
  try {
    console.log("Request body", req.body)
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const result = await loginService({ email, password });

    if (!result.success) {
      return res.status(401).json({
        success: false,
        message: result.message,
      });
    }

    setRefreshTokenCookie(res, result.refreshToken);

    return res.status(200).json({
      success: true,
      message: result.message,
      accessToken: result.accessToken,
      user: result.user,
    });
  } catch (error) {
    console.error("Login controller error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const logoutController = async (req, res) => {
  try {
    const userId = req.user?._id || req.body.userId;
    const refreshToken = getRefreshTokenFromRequest(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const result = await logoutService(userId, refreshToken);

    if (!result.success) {
      clearRefreshTokenCookie(res);
      return res.status(400).json({
        success: false,
        message: result.message,
      });
    }

    clearRefreshTokenCookie(res);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error("Logout controller error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const refreshController = async (req, res) => {
  try {
    const refreshToken = getRefreshTokenFromRequest(req);
    const result = await refreshSessionService(refreshToken);

    if (!result.success) {
      clearRefreshTokenCookie(res);
      return res.status(401).json({
        success: false,
        message: result.message,
      });
    }

    setRefreshTokenCookie(res, result.refreshToken);

    return res.status(200).json({
      success: true,
      message: result.message,
      accessToken: result.accessToken,
      user: result.user,
    });
  } catch (error) {
    console.error("Refresh controller error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const sessionController = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const result = await getSessionService(userId);

    if (!result.success) {
      return res.status(404).json({
        success: false,
        message: result.message,
      });
    }

    return res.status(200).json({
      success: true,
      user: result.user,
    });
  } catch (error) {
    console.error("Session controller error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
