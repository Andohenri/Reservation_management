import express from 'express'
import { createNotification, deleteAllNotification, deleteNotification, getNotifications } from '../controllers/notification.controller.js'
import { authenticate, authenticateAdmin } from '../middleware/auth.js'
const notifRoute = express.Router()

notifRoute.route('/')
   .post(authenticate, authenticateAdmin, createNotification)
notifRoute.route('/:notifId')
   .delete(authenticate, deleteNotification);
notifRoute.route('/my-notifications')
   .get(authenticate, getNotifications)
   .delete(authenticate, deleteAllNotification);


export default notifRoute