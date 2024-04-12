import { model, Schema } from "mongoose";

const reservationSchema = new Schema({
   user: {type: Schema.Types.ObjectId, required: true, ref: "User"},
   trip: {type: Schema.Types.ObjectId, required: true, ref: "Trip"},
   nbrTickets: {type: Number, required: true},
   totalPrice: {type: Number, required: true},
   isPaid: {type: Boolean, default: false}, 
   isPaidAt: {type: Date},
}, {timestamps: true});

const Reservation = model("Reservation", reservationSchema);
export default Reservation;