import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import http from 'http'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url';
import { Server } from 'socket.io'
import cors from 'cors'

import userRoute from './routes/user.route.js';
import uploadRoute from './routes/upload.route.js';
import trainRoute from './routes/train.route.js';
import tripRoute from './routes/trip.route.js';
import reservationRoute from './routes/reservation.route.js';
import notifRoute from './routes/notification.route.js';
import testimonialRoute from './routes/testimonial.route.js';

dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use((req, res, next) => {
   req.io = io;
   next();
})
app.use(cookieParser())
app.use(express.json())
app.use(cors())

app.use('/api/users', userRoute)
app.use('/api/trains', trainRoute)
app.use('/api/trips', tripRoute)
app.use('/api/reservations', reservationRoute)
app.use('/api/notifications', notifRoute)
app.use('/api/testimonials', testimonialRoute)

//uploads images
app.use('/api/uploads', uploadRoute)
//get image via URL
const __dirname = dirname(fileURLToPath(import.meta.url))
app.use('/images', express.static(path.join(__dirname, 'images')))

server.listen(process.env.PORT, () => {
   console.log("Server running");
})

mongoose.connect(process.env.MONGO_URI)
   .then(() => {
      console.log("Mongo DB connected");
   }).catch(() => {
      console.log("Mongo DB not connected.");
   })


let userSockets = [];
let pendingNotifications = [];
const addUser = (id, socketId, isAdmin) => {
   !userSockets.some(u => u.id === id) && userSockets.push({ id, socketId, isAdmin })
}
const removeUser = (socketId) => {
   userSockets = userSockets.filter(u => u.socketId !== socketId)
}
const getUserById = (id) => {
   return userSockets.find(u => u.id === id)
}
const getAdmin = () => {
   return userSockets.find(u => u.isAdmin === true)
}

io.on('connection', (socket) => {

   socket.on('storeUserId', ({ _id, isAdmin }) => {
      addUser(_id, socket.id, isAdmin);
      const user = getUserById(_id);
      if (pendingNotifications[user.id]){
         io.to(user.socketId).emit("receive pending notification", pendingNotifications[user.id], () => {
            pendingNotifications[user.id] = [];
         });
      }
   });

   socket.on("send testimonial", () => {
      const admin = getAdmin();
      if(admin) {
         io.to(admin.socketId).emit("new testimonial");
      }
   })

   socket.on("send notification", ({ userId, content }) => {
      const user = getUserById(userId);
      if (user) {
         io.to(user.socketId).emit("receive notification", content);
      } else {
         if(!pendingNotifications[userId]){
            pendingNotifications[userId] = [];
         }
         pendingNotifications[userId].push(content);
      }
   })
   socket.on('disconnect', () => {
      removeUser(socket.id);
   })
})