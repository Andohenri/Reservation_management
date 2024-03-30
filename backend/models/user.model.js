import mongoose, { Schema } from 'mongoose'

const userSchema = Schema({
   username: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   image: { type: String, required: true, default: '' },
   isAdmin: { type: Boolean, default: false}
})

