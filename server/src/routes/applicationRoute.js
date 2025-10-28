import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { applyJob,getAppliedJobs ,getApplicantsForJob,getAllApplicants,updateApplicationStatus} from "../controllers/applicationController.js";

const router = express.Router();

router.route("/apply").post(wrapAsync(applyJob));
router.route("/applied").get(wrapAsync(getAppliedJobs));

// for recruiters
router.route("/applicants/:jobId").get(wrapAsync(getApplicantsForJob));
router.route("/applicants").get(wrapAsync(getAllApplicants));
router.route("/status/:applicationId").patch(wrapAsync(updateApplicationStatus));

export default router;
