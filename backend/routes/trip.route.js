import express from 'express';
import { createTrip, deleteTrip, getAllTrips, getTrip, getTrips, updateTrip, updateTripToCancelled, updateTripToCompleted, updateTripToInProgress, updateTripToNotifSent } from '../controllers/trip.controller.js';
import { authenticate, authenticateAdmin } from '../middleware/auth.js'
const tripRoute = express.Router();

tripRoute.get('/all-trips', authenticate, authenticateAdmin, getAllTrips);
tripRoute.put('/:tripId/cancelled', authenticate, authenticateAdmin, updateTripToCancelled);
tripRoute.put('/:tripId/in-progress', authenticate, authenticateAdmin, updateTripToInProgress);
tripRoute.put('/:tripId/completed', authenticate, authenticateAdmin, updateTripToCompleted);
tripRoute.put('/:tripId/notif-sent', authenticate, authenticateAdmin, updateTripToNotifSent);

tripRoute.route('/')
   .post(authenticate, authenticateAdmin, createTrip)
   .get(authenticate, getTrips);

tripRoute.route('/:tripId')
   .put(authenticate, authenticateAdmin, updateTrip)
   .delete(authenticate, authenticateAdmin, deleteTrip)
   .get(authenticate, getTrip);

export default tripRoute;