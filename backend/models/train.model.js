import { model, Schema } from "mongoose";

const trainSchema = new Schema({
   name: {type: String, required: true, unique: true},
   type: {type: String, required: true},// TGV, Express, Touristique, Marchandise
   capacity: {type: Number, required: true},
   status: {type: String, default: "avalaible"},
}, {timestamps: true});

const Train = model("Train", trainSchema);
export default Train;