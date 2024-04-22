import Reservation from "../models/reservation.model.js";
import Trip from "../models/trip.model.js";

export const makeReservation = async (req, res) => {
   const { trip, nbrTickets } = req.body
   try {
      const tripFound = await Trip.findById(trip)
      if (tripFound) {
         if (tripFound.avalaible_seats > nbrTickets) {
            tripFound.avalaible_seats = tripFound.avalaible_seats - nbrTickets
            const reservation = new Reservation({
               ...req.body,
               user: req.user._id,
               totalPrice: Number(nbrTickets) * Number(tripFound.price)
            });
            await reservation.save();
            tripFound.passenger.push(req.user._id);
            await tripFound.save()
            return res.status(201).json(reservation);
         } else {
            return res.status(400).json({ message: "Nombre des tickets restants sont insuffisants" });
         }
      } else {
         return res.status(404).json({ message: "Ce voyage n'est pas encore disponible" });
      }
   } catch (error) {
      return res.status(500).json({ message: "Cannot make a reservation" });
   }
}
export const getReservation = async (req, res) => {
   try {
      const reservation = await Reservation.findById(req.params.reservationId)
         .populate("user", "_id username email image")
         .populate("trip");
      if (!reservation) return res.status(404).json({ message: "Ce réservation introuvable" });
      return res.status(200).json(reservation);
   } catch (error) {
      return res.status(500).json({ message: "Cannot get the reservation" });
   }
}
export const getAllReservations = async (req, res) => {
   try {
      const reservations = await Reservation.find()
         .sort({ createdAt: -1 })
         .populate("user")
         .populate("trip");
      return res.status(200).json(reservations);
   } catch (error) {
      return res.status(500).json({ message: "Cannot get all the reservation" });
   }
}
export const cancelledReservation = async (req, res) => {
   try {
      const reservation = await Reservation.findById(req.params.reservationId);
      const tripFound = await Trip.findById(reservation.trip);
      if (!reservation) return res.status(404).json({ message: "Ce réservation est introuvable" });
      if (!tripFound) return res.status(404).json({ message: "Ce voyage est introuvable" });
      tripFound.avalaible_seats = tripFound.avalaible_seats + reservation.nbrTickets;
      if (reservation.isPaid) return res.status(401).json({ message: "La reservation déja payé ne sont plus reboursable" });
      await reservation.deleteOne();
      const idx = tripFound.passenger.indexOf(req.user._id);
      if (idx !== -1) {
         tripFound.passenger.splice(idx, 1);
      }
      await tripFound.save();
      return res.status(200).json(reservation)
   } catch (error) {
      return res.status(200).json({ message: "" })
   }
}
export const modifyReservation = async (req, res) => {
   //TO DO
}
export const getMyReservation = async (req, res) => {
   try {
      const reservations = await Reservation.find({ user: req.user._id })
         .populate("trip")
         .sort({ createdAt: -1 });
      return res.status(200).json(reservations);
   } catch (error) {
      return res.status(500).json({ message: "Cannot get all your reservation" });
   }
}
export const payReservation = async (req, res) => {
   try {
      const reservation = await Reservation.findById(req.params.reservationId)
         .populate('user', 'username email')
         .populate('trip');
      if (!reservation) return res.status(404).json({ message: "Ce réservation est introuvable" });
      if (reservation.isPaid) return res.status(404).json({ message: "Ce réservation a été déja payé" });
      reservation.isPaid = true;
      reservation.isPaidAt = new Date();
      await reservation.save()
      return res.status(200).json(reservation)
   } catch (error) {
      return res.status(500).json({ message: "Un probleme est survenu" })
   }
}
export const calculateRevenueByDate = async (req, res) => {
   try {
      const reservations = await Reservation.find({})
      let revenueData = [];
      reservations.forEach(reservation => {
         const { createdAt, totalPrice, isPaid } = reservation;
         const formattedDate = new Date(createdAt).toLocaleDateString('en-CA');
         const paidRevenue = isPaid ? totalPrice : 0;
         const unpaidRevenue = isPaid ? 0 : totalPrice;
         const totalRevenue = totalPrice;
         const existingDataIndex = revenueData.findIndex(data => data.date === formattedDate);
         if (existingDataIndex !== -1) {
            revenueData[existingDataIndex].paid += paidRevenue;
            revenueData[existingDataIndex].unpaid += unpaidRevenue;
            revenueData[existingDataIndex].total += totalRevenue;
         } else {
            revenueData.push({
               date: formattedDate,
               paid: paidRevenue,
               unpaid: unpaidRevenue,
               total: totalRevenue,
            })
         }
      })
      return res.json(revenueData);
   } catch (error) {
      return res.status(500).json({message: "Erreur en calculant la revenue par date"});
   }
}