import { model, Schema } from "mongoose";

const notificationSchema = new Schema({
   message: {type: String, required: true},
   recipientId: {type: Schema.Types.ObjectId, required: true, ref: "User"},
   type: {type: String, required: true}, //paymentReminder, tripReminder
   trip: {type: Schema.Types.ObjectId, ref: "Trip"},
   reservation: {type: Schema.Types.ObjectId, ref: "Reservation"},
   isRead:{type: Boolean, default:false}
}, {timestamps: true});

const Notification = model("Notification", notificationSchema);
export default Notification;