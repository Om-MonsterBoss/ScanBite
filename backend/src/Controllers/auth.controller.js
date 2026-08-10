import { signupService } from "../service/auth.service.js";

export const signupController = async (req, res) => {
  try {

    const { fullName, email, phoneNumber, password  } = req.body;
    if(!fullName || !email || !phoneNumber || !password){
        return res.status(404).json({
            success:false,
            message:"Something is missing please check it out"
        })
    }
    if(phoneNumber.length < 10){
        return res.status(400).json({
            success:false,
            message:"Invalid phone number"
        })
    }
    if(password.length < 6){
        return res.status(400).json({
            success:false,
            message:"Password should be at least 6 characters long"
        })
    }
    const userData={
        fullName,
        email,
        phoneNumber,
        password
    }

    const userResponse=await signupService(userData);
    if(userResponse.success){
        return res
        .status(201).json({
            success:true,
            message:userResponse.message,
            user:userResponse.user
        })
    }
    else{
        return res.status(400).json({
            success:false,
            message:userResponse.message
        })
    }
  } catch (err) {
    console.log("The error is related to:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
