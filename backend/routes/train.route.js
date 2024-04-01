import express from 'express';
import { createTrain, deleteTrain, getAllTrains, getTrain, updateTrain, updateTrainAvalaible, updateTrainInMaintenance, updateTrainUnavalaible } from '../controllers/train.controller';
import { authenticate, authenticateAdmin } from '../middleware/auth.js'

const trainRoute = express.Router()

trainRoute.put('/avalaible', authenticate, authenticateAdmin, updateTrainAvalaible);
trainRoute.put('/unavalaible', authenticate, authenticateAdmin, updateTrainUnavalaible);
trainRoute.put('/maintenance', authenticate, authenticateAdmin, updateTrainInMaintenance);
trainRoute.route('/')
   .post(authenticate, authenticateAdmin, createTrain)
   .get(authenticate, authenticateAdmin, getAllTrains);
trainRoute.route('/:trainId')
   .put(authenticate, authenticateAdmin, updateTrain)
   .delete(authenticate, authenticateAdmin, deleteTrain)
   .get(authenticate, authenticateAdmin, getTrain);

export default trainRoute