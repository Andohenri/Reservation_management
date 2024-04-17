import Trip from "../models/trip.model.js"
import Train from "../models/train.model.js"

export const createTrip = async (req, res) => {
   const { trainId, departure_date, arrival_date, hour_dep, hour_arr } = req.body

   try {
      const train = await Train.findById(trainId);
      if (!train) return res.status(404).json({ message: "Train not found" });
      if (train.status !== "avalaible") return res.status(401).json({ message: "Train not avalaible" });

      const trip = new Trip({
         ...req.body,
         departure_date: new Date(departure_date + 'T' + hour_dep + ':00Z').toISOString(),
         arrival_date: new Date(arrival_date + 'T' + hour_arr + ':00Z').toISOString(),
         avalaible_seats: train.capacity
      });
      await trip.save();
      return res.status(201).json(trip);
   } catch (error) {
      return res.status(500).json({ message: "Failde to create a trip" });
   }
}
export const getTrips = async (req, res) => {
   const { departure_date, origin, destination } = req.query;

   let searchQuery = {}
   searchQuery = {
      $and: [
         departure_date
            ? { departure_date: { $gte: new Date(departure_date).setHours(0) } }
            : { departure_date: { $gte: new Date().setHours(0) } },
         origin ? { origin } : {},
         destination ? { destination } : {}
      ]
   }
   
   try {
      const trips = await Trip.find(searchQuery).populate("trainId", "_id name type").sort({ createdAt: -1 });
      return res.status(200).json(trips);
   } catch (error) {
      return res.status(500).json({ message: "Failde to fetch the trips" });
   }
}
export const getAllTrips = async (req, res) => {
   try {
      const trips = await Trip.find().populate("trainId", "_id name capacity").sort({ createdAt: -1 });
      return res.status(200).json(trips);
   } catch (error) {
      return res.status(500).json({ message: "Failde to fetch the trips" });
   }
}
export const updateTrip = async (req, res) => {
   const { departure_date, arrival_date, origin, destination, price, hour_dep, hour_arr } = req.body;
   try {
      const trip = await Trip.findById(req.params.tripId);
      if (!trip) return res.status(404).json({ message: "Trip not found" });


      trip.departure_date = new Date(departure_date + 'T' + hour_dep + ':00Z').toISOString();
      trip.arrival_date = new Date(arrival_date + 'T' + hour_arr + ':00Z').toISOString();
      trip.origin = origin || trip.origin;
      trip.destination = destination || trip.destination;
      trip.price = price || trip.price;

      await trip.save();
      return res.status(200).json(trip);
   } catch (error) {
      return res.status(500).json({ message: error });
   }
}
export const getTrip = async (req, res) => {
   try {
      const trip = await Trip.findById(req.params.tripId).populate("trainId", "_id name capacity type");
      if (!trip) return res.status(404).json({ message: "Trip not found" });
      return res.status(200).json(trip);
   } catch (error) {
      return res.status(500).json({ message: "Failde to fetch the trips" });
   }
}

//in progress
export const updateTripToInProgress = async (req, res) => {
   try {
      const trip = await Trip.findByIdAndUpdate(req.params.tripId, { status: "in progress" }, { new: true });
      return res.status(200).json(trip);
   } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
   }
}
//completed
export const updateTripToCompleted = async (req, res) => {
   try {
      const trip = await Trip.findByIdAndUpdate(req.params.tripId, { status: "completed" }, { new: true });
      return res.status(200).json(trip);
   } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
   }
}
//Cancelled
export const updateTripToCancelled = async (req, res) => {
   try {
      const trip = await Trip.findByIdAndUpdate(req.params.tripId, { status: "cancelled" }, { new: true });
      return res.status(200).json(trip);
   } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
   }
}