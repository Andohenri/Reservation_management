import express from 'express';
import { login, register } from '../controllers/user.controller.js';
const userRoute = express.Router()

userRoute.route('/login').post(login)
userRoute.route('/register').post(register)


export default userRoute;