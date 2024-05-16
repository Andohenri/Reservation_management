import express from 'express'
import { createNotification, deleteAllNotification, deleteNotification, getNotifications, markAllNotificationsAsRead } from '../controllers/notification.controller.js'
import { authenticate, authenticateAdmin } from '../middleware/auth.js'
const notifRoute = express.Router()

notifRoute.route('/my-notifications')
   .get(authenticate, getNotifications)
   .delete(authenticate, deleteAllNotification)
   .put(authenticate, markAllNotificationsAsRead);
notifRoute.route('/')
   .post(authenticate, authenticateAdmin, createNotification)
notifRoute.route('/:notifId')
   .delete(authenticate, deleteNotification);


export default notifRoute