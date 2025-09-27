import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { registerUser ,loginUser} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", wrapAsync (registerUser))
      .post("/login", (loginUser));


export default router;
