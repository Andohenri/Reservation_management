import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

const server = express()
server.use(express.json())

mongoose.connect(process.env.MONGO_URI).then(() => {
   console.log("Mongo DB connected");
}).catch(err => {
   console.log("Mongo DB not connected.");
})

server.listen(process.env.PORT, () => {
   console.log("Server running");
})