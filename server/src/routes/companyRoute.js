import express from 'express';
import { registerCompany ,getCompany ,getCompanyById,updateCompany,deleteCompany} from '../controllers/companyController.js';
import wrapAsync from '../utils/wrapAsync.js';
import multer from 'multer';
import { storage } from '../config/cloudConfig.js'
const upload = multer({ storage })
import {isLoggedIn} from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.route("/register").post(isLoggedIn,upload.single('logo'), wrapAsync(registerCompany));

router.route("/get").get(isLoggedIn,wrapAsync(getCompany));
router.route("/get/:id").get(wrapAsync(getCompanyById));
router.route("/update/:id").put(upload.single('logo'), wrapAsync(updateCompany));
router.route("/delete/:id").delete(wrapAsync(deleteCompany));
export default router;


