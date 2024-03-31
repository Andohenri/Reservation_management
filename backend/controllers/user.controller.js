import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import fs from 'fs';
import { generateToken } from "../utils/token.js";

export const register = async (req, res) => {
   const { username, email, password } = req.body;
   try {

      if(!username) return res.status(401).json({message: "Username is required"});
      if(!email) return res.status(401).json({message: "Email is required"});
      if(!password) return res.status(401).json({message: "Password is required"});

      const existingUser = await User.findOne({ email });
      if(existingUser) return res.status(400).json({ message: "User already exist" });

      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = await User.create({
         username, email, password: hashedPassword
      })
      generateToken(res, newUser);
      return res.status(201).json({
         _id: newUser._id,
         username: newUser.username,
         image: newUser.image,
         email: newUser.email,
         isAdmin: newUser.isAdmin
      });
   } catch (error) {
      return res.status(505).json({message: "Failed to create user"});
   }
}
export const login = async (req, res) => {
   const { email, password } = req.body;
   try {
      if(!email) return res.status(401).json({message: "Email is required"});
      if(!password) return res.status(401).json({message: "Password is required"});
      const user = await User.findOne({ email });
      if(!user) return res.status(404).json({message: "User does not exist"});
      
      // compare password
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if(!isPasswordValid) return res.status(401).json({ message: "Invalid credentials"});

      generateToken(res, user);
      return res.status(200).json({
         _id: user._id,
         username: user.username,
         email: user.email,
         image: user.image,
         isAdmin: user.isAdmin
      });
   } catch (error) {
      return res.status(500).json({message: error})
   }
}
export const logout = (req, res) => {
   res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0)
   })
   res.status(200).json({message: "Logged out succesfully!"})
}
export const getAllUsers = async (req, res) => {
   try {
      const users = await User.find({}).select("-password");
      return res.status(200).json(users);
   } catch (error) {
      return res.status(500).json({message: "Failed to fetch the users"});
   }
}
export const getCurrentUserProfile = async (req, res) => {
   try {
      const user = await User.findById(req.user._id).select("-password");
      if(!user) return res.status(404).json({message: "User not found"});
      return res.status(200).json(user);
   } catch (error) {
      return res.status(500).json({message: "Failed to fetch the users"});
   }
}
export const updateCurrentUserProfile = async (req, res) => {
   const {username, email, password, image} = req.body
   try {
      const user = await User.findById(req.user._id);
      if(!user) return res.status(404).json({ message: "User not found" });
      //Check if password exist in the body request
      let hashedPassword
      if(password) {
         hashedPassword = await bcrypt.hashSync(password, 10)
      }
      if(image){
         const filename = user.image.split('/images/')[1]
         if(filename){
            fs.unlink(`backend/images/${filename}`, (err) => {
                  if(err) throw err
            })
         }
      }
      user.username = username || user.username;
      user.email = email || user.email;
      user.password = hashedPassword || user.password;
      user.image = image || user.image;

      await user.save()
      return res.status(200).json(user)
   } catch (error) {
      return res.status(500).json({ message: error })
   }
}
export const deleteUserById = async (req, res) => {
   try {
      const user = await User.findById(req.params.userId);
      if(!user) return res.status(404).json({error: "User not found."});
      const filename = user.image.split('/images/')[1]
      if(filename){
         fs.unlink(`backend/images/${filename}`, (err) => {
               if(err) throw err
         })
      }
      const userDeleted = await User.findByIdAndDelete(req.params.userId);
      res.status(200).json(userDeleted);
   } catch (error) {
      res.status(500).json({message: "Failed to delete the user"})
   } 
}
export const getUserById = async (req, res) => {
   try {
      const user = await User.findById(req.params.userId).select("-password");
      if(!user) return res.status(404).json({message: "User not found"})
      return res.status(200).json(user);
   } catch (error) {
      return res.status(500).json({message: "Failed to fetch the user"});
   }
}

// export const updateUserById = async (req, res) => {
//    await User.findById(req.params.userId)
//    .then(userfound => {
//        userfound.username = req.body.username || userfound.username
//        userfound.email = req.body.email || userfound.email
//        const updateUser = userfound.save()
//        return res.status(200).json(updateUser)
//    }).catch(err => res.status(500).json({message: "User not found!"}))
// }