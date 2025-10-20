import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { genToken } from '../utils/genToken.js'  // ✅ Make sure this path is correct

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email exists
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // Generate token
    const token = await genToken(user._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: false
    });

    // Return user (without password)
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};


export const Login = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email exists
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Validate password length
   const isMatch= await bcrypt.compare(password,existEmail.password)
   if(!isMatch){
    return res.status(400).json({ message: "Email already exists" });

   }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // Generate token
    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: false
    }
    )
    return res.status(201).json(user)

   

    // Return user (without password)
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const logOut=async (req,res)=>{
  try{
    res.clearCookie("token")
    return res.status(200).json({message:"Logged out successfully"})
  } catch (error){
    console.error(error);


  }
}






