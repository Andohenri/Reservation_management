import Notification from "../models/notification.model.js";
import Trip from "../models/trip.model.js";
import Reservation from "../models/reservation.model.js";

export const createNotification = async (req, res) => {
   try {
      let message;
      const { type, trip: tripId, reservation: reservationId, recipientId } =  req.body
      
      if(type === 'paymentReminder'){
         const reservation = await Reservation.findById(reservationId).populate("trip", "destination departure_date")
         message = `Merci de payer votre réservation pour le voyage à destination de ${reservation.trip.destination} le ${reservation.trip.departure_date}`;
      }else if(type === 'tripReminder'){
         const trip = await Trip.findById(tripId)
         message = `Rappel: votre voyage à destination ${trip.destination} commence le ${trip.departure_date}. Assurez-vous d'être prêt !`;
      }

      const notification = new Notification({
         ...req.body,
         recipientId: recipientId,
         message
      })
      await notification.save()
      return res.status(201).json(notification)
   } catch (error) {
      return res.status(500).json({message: "il y a un problème de serveur, veuillez le vérifier"})
   }
}

export const deleteNotification = async (req, res) => {
   try {
      const notification = Notification.findByIdAndDelete(req.params.notifId)
      return res.status(200).json(notification)
   } catch (error) {
      res.status(500).json({message: "il y a un problème de serveur, veuillez le vérifier"})
   }
}

export const deleteAllNotification = async (req, res) => {
   try {
      const notifications = Notification.deleteMany({recipientId: req.user._id})
      return res.status(200).json(notifications)
   } catch (error) {
      res.status(500).json({message: "il y a un problème de serveur, veuillez le vérifier"})
   }
}

export const getNotifications = async (req, res) => {
   const pageNumber = parseInt(req.query.pageNumber) || 1;
   const pageSize = parseInt(req.query.pageSize) || 10;
   const skipAmount = (pageNumber - 1) * pageSize;
   try {
      const notifications = await Notification.find({recipientId: req.user._id})
         .sort({createdAt: -1})
         .skip(skipAmount)
         .limit(pageSize)
         .exec();
      const totalsCount = await Notification.countDocuments({recipientId: req.user._id});
      const isNext = totalsCount > skipAmount + notifications.length;
      return res.status(200).json({ notifications, isNext });
   } catch (error) {
      return res.status(500).json({message: "il y a un problème de serveur, veuillez le vérifier"});
   }
}