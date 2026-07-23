import express from "express";
const router = express.Router();
import wrapAsync from "../utils/wrapAsync.js";
import { getAllJobs ,getJobById,createJob,updateJob,deleteJob ,getAdminJobs} from "../controllers/jobController.js";
import { isLoggedIn } from "../middlewares/isAuthenticated.js"

router.route("/").get(isLoggedIn,wrapAsync(getAllJobs));

router.route("/getadminjobs").get(isLoggedIn,wrapAsync(getAdminJobs));

router.route("/:id").get(wrapAsync(getJobById));

router.route("/create").post(isLoggedIn,wrapAsync(createJob));

router.route("/update/:id").put(wrapAsync(updateJob));

router.route("/delete/:id").delete(wrapAsync(deleteJob));


export default router;
    
