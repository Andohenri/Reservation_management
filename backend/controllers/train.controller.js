import Train from "../models/train.model.js";

export const createTrain = async (req, res) => {
   const { name, type, capacity } = req.body;
   const trainExist = await Train.findOne({ name });
   if(trainExist) return res.status(400).json({ message: "Le nom est déja utilisé."});
   try {
      const train = new Train({ name, type, capacity });
      await train.save();
      return res.status(201).json(train);
   } catch (error) {
      return res.status(500).json({message: "Cannot create the train"});
   }
}
export const updateTrain = async (req, res) => {
   const { name, type, capacity } = req.body;
   try {
      const train = await Train.findById(req.params.trainId);
      if(!train) return res.status(404).json({ message: "Train not found"});
      train.name = name || train.name;
      train.type = type || train.type;
      train.capacity = capacity || train.capacity;
      await train.save();
      return res.status(200).json(train);
   } catch (error) {
      return res.status(500).json({message: "Cannot update the train"});
   }
}
export const deleteTrain = async (req, res) => {
   try {
      const train = await Train.findByIdAndDelete(req.params.trainId);
      if(!train) return res.status(404).json({ message: "Train not found"});
      return res.status(200).json(train);
   } catch (error) {
      return res.status(500).json({message: "Cannot delete the train"});
   }
}
export const getAllTrains = async (req, res) => {
   try {
      const trains = await Train.find({});
      return res.status(200).json(trains);
   } catch (error) {
      return res.status(500).json({message: "Cannot fetch all the train"});
   }
}
export const getTrain = async (req, res) => {
   try {
      const train = await Train.findById(req.params.trainId);
      if(!train) return res.status(404).json({ message: "Train not found"});
      return res.status(200).json(train);
   } catch (error) {
      return res.status(500).json({message: "Cannot fetch the train"});
   }
}
export const updateTrainAvalaible = async (req, res) => {
   try {
      const train = await Train.findByIdAndUpdate(req.params.trainId, {status: "avalaible"}, {new: true});
      return res.status(200).json(train);
   } catch (error) {
      return res.status(500).json({message: "Something went wrong"});
   }
}
export const updateTrainUnavalaible = async (req, res) => {
   try {
      const train = await Train.findByIdAndUpdate(req.params.trainId, {status: "unavalaible"}, {new: true});
      return res.status(200).json(train);
   } catch (error) {
      return res.status(500).json({message: "Something went wrong"});
   }
}
export const updateTrainInMaintenance = async (req, res) => {
   try {
      const train = await Train.findByIdAndUpdate(req.params.trainId, {status: "maintenance"}, {new: true});
      return res.status(200).json(train);
   } catch (error) {
      return res.status(500).json({message: "Something went wrong"});
   }
}