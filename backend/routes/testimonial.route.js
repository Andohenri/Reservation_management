import express from "express";
import { authenticate } from '../middleware/auth.js';
import { createTestimonial, deleteTestimonial, getAllTestimonials, updateTestimonial } from "../controllers/testimonial.controller.js";
const testimonialRoute = express.Router();

testimonialRoute.route('/')
   .get(getAllTestimonials)
   .post(authenticate, createTestimonial);
testimonialRoute.route('/:testId')
   .put(authenticate, updateTestimonial)
   .delete(authenticate, deleteTestimonial);

export default testimonialRoute;