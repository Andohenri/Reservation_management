import { model, Schema } from 'mongoose'

const userSchema = new Schema({
   username: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   image: { type: String, default: '' },
   isAdmin: { type: Boolean, default: false}
}, { timestamps: true });

const User = model("User", userSchema);
export default User;
