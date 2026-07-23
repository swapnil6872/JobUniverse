import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { applyJob,getAppliedJobs ,getApplicantsForJob,getAllApplicants,updateApplicationStatus,getDeleteApplication} from "../controllers/applicationController.js";
import {isLoggedIn} from '../middlewares/isAuthenticated.js';
import multer from 'multer';
import { storage } from '../config/cloudConfig.js'
const upload = multer({ storage })

const router = express.Router();

router.route("/apply").post(isLoggedIn, upload.single("resume"), wrapAsync(applyJob));
router.route("/applied").get(wrapAsync(getAppliedJobs));

// for recruiters
router.route("/applicants/:id").get(wrapAsync(getApplicantsForJob));
router.route("/applicants/:id").delete(wrapAsync(getDeleteApplication))
router.route("/applicants").get(wrapAsync(getAllApplicants));
router.route("/status/:applicationId").patch(wrapAsync(updateApplicationStatus));


export default router;
