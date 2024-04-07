import Trip from "../models/trip.model.js"
import Train from "../models/train.model.js"

export const createTrip = async (req, res) => {
   const { trainId, departure_date, arrival_date, hour_dep, hour_arr } = req.body
   
   try {
      const train = await Train.findById(trainId);
      if(!train) return res.status(404).json({message: "Train not found"});
      if(train.status !== "avalaible") return res.status(401).json({message: "Train not avalaible"});

      const trip = new Trip({
         ...req.body,
         departure_date: new Date(departure_date + 'T' + hour_dep + ':00Z').toISOString(),
         arrival_date: new Date(arrival_date + 'T' + hour_arr + ':00Z').toISOString(),
         avalaible_seats: train.capacity
      });
      await trip.save();
      return res.status(201).json(trip);
   } catch (error) {
      return res.status(500).json({message: "Failde to create a trip"});
   }
}
export const getTrips = async (req, res) => {
   const { date_depart, heure_depart, origin, destination } = req.query;
   
   const date = new Date().setHours(0,0,0);
   let searchQuery = { 
      departure_date: { $gte: new Date(date) }
   }

   if(date_depart){
      searchQuery.departure_date = { $gte: new Date(date_depart) };
   }
   if(heure_depart){
      const stringHour = heure_depart.split(":")
      const inHour = stringHour.map(str => parseInt(str, 10))

      searchQuery.$expr = {
         $in: [{$hour: "$departure_date"}, [inHour[0]]]
      }
   }
   if(origin) searchQuery.origin = { $eq: origin };
   if(destination) searchQuery.destination = { $eq: destination };

   console.log(searchQuery);

   try {
      const trips = await Trip.find(searchQuery).populate("trainId", "_id name capacity").sort({createdAt: -1});
      return res.status(200).json(trips);
   } catch (error) {
      return res.status(500).json({message: "Failde to fetch the trips"});
   }
}
export const getAllTrips = async (rea, res) => {
   try {
      const trips = await Trip.find().populate("trainId", "_id name capacity").sort({createdAt: -1});
      return res.status(200).json(trips);
   } catch (error) {
      return res.status(500).json({message: "Failde to fetch the trips"});
   }
}
export const updateTrip = async (req, res) => {
   const { departure_date, arrival_date, origin, destination, price } = req.body;
   try {
      const trip = await Trip.findById(req.params.tripId);
      if(!trip) return res.status(404).json({message: "Trip not found"});

      // const trip = await Trip.findByIdAndUpdate(req.params.tripId, {...req.bidy}, {new: true});
      trip.departure_date = departure_date || trip.departure_date;
      trip.arrival_date = arrival_date || trip.arrival_date;
      trip.origin = origin || trip.origin;
      trip.destination = destination || trip.destination;
      trip.price = price || trip.price;
      
      await trip.save();
      return res.status(200).json(trip);
   } catch (error) {
      return res.status(500).json({message: error});
   }
}
export const getTrip = async (req, res) => {
   try {
      const trip = await Trip.findById(req.params.tripId).populate("trainId", "_id name capacity");
      if(!trip)return res.status(404).json({message: "Trip not found"});
      return res.status(200).json(trip);
   } catch (error) {
      return res.status(500).json({message: "Failde to fetch the trips"});
   }
}

//in progress
export const updateTripToInProgress = async (req, res) => {
   try {
      const trip = await Trip.findByIdAndUpdate(req.params.tripId, {status: "in progress"}, {new: true});
      return res.status(200).json(trip);
   } catch (error) {
      return res.status(500).json({message: "Something went wrong"});
   }
}
//completed
export const updateTripToCompleted = async (req, res) => {
   try {
      const trip = await Trip.findByIdAndUpdate(req.params.tripId, {status: "completed"}, {new: true});
      return res.status(200).json(trip);
   } catch (error) {
      return res.status(500).json({message: "Something went wrong"});
   }
}
//Cancelled
export const updateTripToCancelled = async (req, res) => {
   try {
      const trip = await Trip.findByIdAndUpdate(req.params.tripId, {status: "cancelled"}, {new: true});
      return res.status(200).json(trip);
   } catch (error) {
      return res.status(500).json({message: "Something went wrong"});
   }
}