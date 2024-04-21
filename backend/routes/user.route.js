import express from 'express';
import { deleteUserById, getAllUsers, getCurrentUserProfile, getUserById, login, logout, register, updateCurrentUserProfile } from '../controllers/user.controller.js';
import { authenticate, authenticateAdmin } from '../middleware/auth.js';
const userRoute = express.Router();

userRoute.route('/login').post(login);
userRoute.route('/register').post(register);
userRoute.route('/logout').post(logout);

userRoute.route('/me')
   .get(authenticate, getCurrentUserProfile)
   .put(authenticate, updateCurrentUserProfile)

userRoute.route('/')
   .get(authenticate, authenticateAdmin, getAllUsers)

userRoute.route('/:userId')
   .delete(authenticate, authenticateAdmin, deleteUserById)
   .get(authenticate, getUserById)
   
export default userRoute;