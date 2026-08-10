import User from "../models/DBResModels/User.model.js";
import welcomeQueue from "../queues/worker.queue.js";
import { authProvider } from "../utils/provider.js";
import bcrypt from "bcrypt";

export const signupService = async (userData) => {
  const { fullName,
    email,
    phoneNumber,
    password } = userData;

  const userExist = await User.findOne({ email });

  if (userExist) {
    return {
      success: false,
      message: "user Already exists with this email"
    }
  }

  // 🔐 hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    fullName,
    email,
    phoneNumber,
    password: hashedPassword,
    authProvider: authProvider.local
  });

  if (newUser) {
    await newUser.save();

    // generateToken(newUser._id, res);

    await welcomeQueue.add("welcome-email", {
      name: newUser.firstName,
      email: newUser.email,
    });

    return {
      success: true,
      message: "Signup successful",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    };
  }
  else {
    return {
      success: false,
      message: "Something wrong while signing the user "
    };
  }
}