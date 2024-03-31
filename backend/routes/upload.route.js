import express from 'express';
import multerMiddleware from '../middleware/multer.js'
const uploadRoute = express.Router();

// const uploadImages = multer.fields([{name: 'imageProfile' , maxCount: 1}, {name: 'imageArticle' , maxCount: 1}])
const uploadImages = multerMiddleware.single('image')

uploadRoute.route('/').post((req, res) => {
   uploadImages(req, res, (err) => {
      if(err){
         res.status(400).json({ message: err.message })
      }else if(req.file){
         // const imageArticle = req.files['imageArticle'] ? req.files['imageArticle'][0].filename : null
         res.status(200).json({
            message: "Images uploaded succesfully",
            image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
         })
      }else{
         res.status(400).json({ message: "No files provided" })
      }
   })
})

export default uploadRoute