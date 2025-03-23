import User from '../models/user.model.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {

  const {username, email , password} = req.body;

 try {
   // Validate request body
   if (!username ||!email ||!password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  // Check Existing user
  const existingUser = await User.findOne({email});
  if (existingUser) {
    return res.status(400).json( {message:'User already exists'} );
  }
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  


  // Create new user
  const result = new User({username, email, password:hashedPassword});
  await result.save();

  // Create JWT token
  const token = jwt.sign({email:result.email ,id: result._id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });

  res.status(201).json({user:result, message: 'User registered successfully', token });

 } catch (error) {
  
  console.log(error);
  
  res.status(500).json({ message: "Something went wrong" });
  
 }


}

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email ||!password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
    res.json({ user, message: 'Logged in successfully', token });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const logoutController = async (req, res) => {
  try {
    // You might want to add the token to a blacklist in a real implementation
    // For now, we'll just send a success response
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};