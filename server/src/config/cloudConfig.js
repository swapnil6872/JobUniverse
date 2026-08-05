import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import path from "path";


cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    // params: {
    //   folder: 'JobUniverse_dev',
    //   allowedFormats: ["jpg", "png", "jpeg"],
    // }
      params: async (req, file) => {
    // detect file extension
    const ext = file.originalname.split('.').pop().toLowerCase();
    const isImage = ['jpg', 'jpeg', 'png'].includes(ext);
    // const isDocument = /\.(pdf|doc|docx)$/i.test(file.originalname);

//     if (isDocument) {
//       // return {
//       //   folder: "resumes",
//       //   resource_type: "raw", // Keeps format intact
//       //   public_id: `${Date.now()}-${file.originalname}`, // Preserves original extension like .pdf
//       // };
//       return {
//   folder: "resumes",
//   resource_type: "raw",
//   // public_id: `${Date.now()}-${path.parse(file.originalname).name}`,
//   public_id: `${Date.now()}-${file.originalname}`,
// };
//     }

    return {
      folder: 'JobUniverse_dev',
      allowedFormats: ['jpg', 'jpeg', 'png', 'pdf', 'docx'],
      resource_type: isImage ? 'image' : 'raw', // makes PDFs + DOCX work becouse Cloudnary assumes all uploads are images by default
    };
  },
  });

export  {
    cloudinary,
    storage
}
  