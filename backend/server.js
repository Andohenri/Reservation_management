import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import path, { dirname } from 'path'

import userRoute from './routes/user.route.js';
import uploadRoute from './routes/upload.route.js';
import { fileURLToPath } from 'url';
dotenv.config()

const server = express()

server.use(cookieParser())
server.use(express.json())

server.use('/api/users', userRoute)

//uploads images
server.use('/api/uploads', uploadRoute)
//get image via URL
const __dirname = dirname(fileURLToPath(import.meta.url))
server.use('/images', express.static(path.join(__dirname, 'images')))

server.listen(process.env.PORT, () => {
   console.log("Server running");
})

mongoose.connect(process.env.MONGO_URI)
.then(() => {
   console.log("Mongo DB connected");
}).catch(err => {
   console.log("Mongo DB not connected.");
})