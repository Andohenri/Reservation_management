import multer, { diskStorage } from 'multer';
import { extname } from 'path';

const storage = diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'backend/images');
   },
   filename: (req, file, cb) => {
      const name = file.fieldname
      const extension = extname(file.originalname)
      cb(null, `${name}_${Date.now()}${extension}`)
   }
})
const fileFilter =  (req, file, cb) => {
   const filetypes = /jpe?g|png|webp/
   const mimetypes = /image\/jpe?g|image\/png|image\/webp/
   const extension = extname(file.originalname).toLowerCase()
   const mimetype = file.mimetype
   if(filetypes.test(extension) && mimetypes.test(mimetype)){
      cb(null, true)
   }else{
      cb(new Error("Images only"), false)
   }
}

const multerMiddleware = multer({storage, fileFilter})
export default multerMiddleware