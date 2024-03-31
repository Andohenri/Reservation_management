import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
   const { username, email, password } = req.body;
   try {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = await User.create({
         username, email, password: hashedPassword
      })
      return res.status(201).json(newUser)
   } catch (error) {
      return res.status(505).json({message: "Cannot create User."})
   }
}
export const login = (req, res) => {
   res.json("API working");
}