import express from "express";
const router = express.Router();
import wrapAsync from "../utils/wrapAsync.js";
import { getAllJobs ,getJobById,createJob,updateJob,deleteJob ,getAdminJobs, filterJobs} from "../controllers/jobController.js";
import { isLoggedIn } from "../middlewares/isAuthenticated.js"

router.route("/").get(wrapAsync(getAllJobs));

router.route("/filter").get(wrapAsync(filterJobs))

router.route("/getadminjobs").get(isLoggedIn,wrapAsync(getAdminJobs));

router.route("/:id").get(wrapAsync(getJobById));

router.route("/create").post(isLoggedIn,wrapAsync(createJob));

router.route("/update/:id").put(isLoggedIn,wrapAsync(updateJob));

router.route("/delete/:id").delete(isLoggedIn,wrapAsync(deleteJob));


export default router;
    
