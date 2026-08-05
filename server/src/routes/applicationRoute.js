import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { applyJob,getAppliedJobs ,getApplicantsForJob,getAllApplicants,updateApplicationStatus,deleteApplication} from "../controllers/applicationController.js";
import {isLoggedIn} from '../middlewares/isAuthenticated.js';
import multer from 'multer';
import { storage } from '../config/cloudConfig.js'
const upload = multer({ storage })

const router = express.Router();

router.route("/apply").post(isLoggedIn, upload.single("resume"), wrapAsync(applyJob));
router.route("/applied").get(isLoggedIn,wrapAsync(getAppliedJobs));

// for recruiters
router.route("/applicants/:id").get(isLoggedIn,wrapAsync(getApplicantsForJob));
router.route("/applicants/:applicationId").delete(isLoggedIn,wrapAsync(deleteApplication));
router.route("/applicants").get(isLoggedIn,wrapAsync(getAllApplicants));
router.route("/status/:applicationId").patch(isLoggedIn,wrapAsync(updateApplicationStatus));


export default router;
    