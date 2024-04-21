import { model, Schema } from 'mongoose';

const tripSchema = new Schema({
   trainId: {type: Schema.Types.ObjectId, required: true, ref: "Train"},
   departure_date: {type: Date, required: true},
   arrival_date: {type: Date, required: true},
   origin: {type: String, required: true},
   destination: {type: String, required: true},
   price: {type: Number, required: true},
   avalaible_seats: {type: Number, required: true},
   passenger: [{type: Schema.Types.ObjectId, ref: "User"}],
   status: {type: String, default: "pending"}
}, { timestamps: true })

const Trip = model("Trip", tripSchema);
export default Trip;