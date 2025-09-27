import express from "express";
const router = express.Router();
import wrapAsync from "../utils/wrapAsync.js";
import { getAllJobs ,getJobById} from "../controllers/jobController.js";

router.route("/").get(wrapAsync(getAllJobs));

router.route("/:id").get(wrapAsync(getJobById));

export default router;
    