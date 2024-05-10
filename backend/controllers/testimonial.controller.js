import Testimonial from "../models/testimonial.model.js";

export const createTestimonial = async (req, res) => {
   try {
      const test = await Testimonial.create({...req.body, author: req.user._id})
      return res.status(201).json(test);
   } catch (error) {
      return res.status(500).json({message: "Une erreur qui vient du serveur"});
   }
}
export const updateTestimonial = async (req, res) => {
   try {
      const test = await Testimonial.findByIdAndUpdate(req.params.testId, {...req.body}, {new: true})
      return res.status(200).json(test);
   } catch (error) {
      return res.status(500).json({message: "Une erreur qui vient du serveur"});
   }
}
export const deleteTestimonial = async (req, res) => {
   try {
      const test = await Testimonial.findByIdAndDelete(req.params.testId)
      return res.status(200).json(test);
   } catch (error) {
      return res.status(500).json({message: "Une erreur qui vient du serveur"});
   }
}
export const getAllTestimonials = async (req, res) => {
   try {
      const tests = await Testimonial.find({}).sort({createdAt: -1}).populate("author", "username image")
      return res.status(200).json(tests);
   } catch (error) {
      return res.status(500).json({message: "Une erreur qui vient du serveur"});
   }
}