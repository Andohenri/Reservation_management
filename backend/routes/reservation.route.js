import express from 'express'
import { cancelledReservation, getAllReservations, getMyReservation, getReservation, makeReservation, payReservation } from '../controllers/reservation.controller.js'
import { authenticate, authenticateAdmin } from '../middleware/auth.js'
const reservationRoute = express.Router()

reservationRoute.get('/my-reservations', authenticate, getMyReservation);

reservationRoute.route('/')
   .post(authenticate, makeReservation)
   .get(authenticate, authenticateAdmin, getAllReservations);

reservationRoute.route('/:reservationId')
   .get(authenticate, getReservation)
   .delete(authenticate, cancelledReservation);

reservationRoute.put('/:reservationId/pay', authenticate, payReservation)

export default reservationRoute