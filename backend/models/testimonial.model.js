import { model, Schema } from "mongoose";

const testimonialSchema = new Schema({
   author: {type: Schema.Types.ObjectId, required: true, ref: "User"},
   content: {type: String, required: true},
   note: {type: Number, required: true}
}, {timestamps: true});

const Testimonial = model("Testimonial", testimonialSchema);
export default Testimonial;