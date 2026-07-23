import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { registerUser ,loginUser,logoutUser} from "../controllers/userController.js";
import passport from "passport";

const router = express.Router();

router.post("/register", wrapAsync (registerUser))
      .post("/login", (passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}),loginUser));

router.post('/logout',logoutUser);

export default router;
