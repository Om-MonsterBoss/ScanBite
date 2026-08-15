import jwt from "jsonwebtoken";

const accessSecret = process.env.JWT_ACCESS_SECRET || "scanbite-access-secret";
const refreshSecret = process.env.JWT_REFRESH_SECRET || "scanbite-refresh-secret";

export const generateAccessToken = (user) =>
  jwt.sign(
    {
      id: user._id.toString(),
      email: user.email,
      role: user.role || "USER",
    },
    accessSecret,
    { expiresIn: "15m" }
  );

export const generateRefreshToken = (user) =>
  jwt.sign(
    {
      id: user._id.toString(),
      email: user.email,
      type: "refresh",
    },
    refreshSecret,
    { expiresIn: "7d" }
  );

export const generateTokenPair = (user) => ({
  accessToken: generateAccessToken(user),
  refreshToken: generateRefreshToken(user),
});

export const verifyAccessToken = (token) => jwt.verify(token, accessSecret);
export const verifyRefreshToken = (token) => jwt.verify(token, refreshSecret);
