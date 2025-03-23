import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  username:{
    type: String,
    required: true,
  },

  password:{
    type: String,
    required: true,
    minlength: [6, 'password must be at least 6 characters']
  },

  email:{
    type: String,
    required: true,
  },

},{timestamps: true});


const User = mongoose.model("User", userSchema);

export default User;