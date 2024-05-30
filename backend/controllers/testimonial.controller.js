import Testimonial from "../models/testimonial.model.js";

export const createTestimonial = async (req, res) => {
   try {
      const test = await Testimonial.create({ ...req.body, author: req.user._id })
      return res.status(201).json(test);
   } catch (error) {
      return res.status(500).json({ message: "Une erreur qui vient du serveur" });
   }
}
export const updateTestimonial = async (req, res) => {
   try {
      const test = await Testimonial.findByIdAndUpdate(req.params.testId, { ...req.body }, { new: true })
      return res.status(200).json(test);
   } catch (error) {
      return res.status(500).json({ message: "Une erreur qui vient du serveur" });
   }
}
export const deleteTestimonial = async (req, res) => {
   try {
      const test = await Testimonial.findByIdAndDelete(req.params.testId)
      return res.status(200).json(test);
   } catch (error) {
      return res.status(500).json({ message: "Une erreur qui vient du serveur" });
   }
}
export const getAllTestimonials = async (req, res) => {
   const pageNumber = parseInt(req.query.pageNumber) || 1;
   const pageSize = parseInt(req.query.pageSize) || 10;
   const skipAmount = (pageNumber - 1) * pageSize;
   try {
      const tests = await Testimonial.find({})
         .sort({ createdAt: -1 })
         .populate("author", "username image")
         .skip(skipAmount)
         .limit(pageSize)
         .exec();
      const totalsCount = await Testimonial.countDocuments({});
      const isNext = totalsCount > skipAmount + tests.length;
      const note = tests.reduce((acc, item) => acc + item.note, 0);
      const avg = (note / totalsCount).toFixed(1);
      return res.status(200).json({ tests, isNext, avg, totalsCount });
   } catch (error) {
      return res.status(500).json({ message: "Une erreur qui vient du serveur" });
   }
}