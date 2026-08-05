import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { registerUser ,loginUser,logoutUser,updateUser,getUserProfile,changePassword,updateEmail,deleteUser} from "../controllers/userController.js";
import passport from "passport";
import {isLoggedIn} from "../middlewares/isAuthenticated.js";
import multer from "multer";
import { storage } from '../config/cloudConfig.js'
const upload = multer({ storage })

const router = express.Router();

router.get("/profile", isLoggedIn, wrapAsync(getUserProfile))
router.patch( "/profile/update",isLoggedIn,upload.fields([{ name: "profilePicture", maxCount: 1 }, { name: "resume", maxCount: 1 }, ]),wrapAsync(updateUser));

router.post("/register", wrapAsync (registerUser))
      .post("/login", (passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}),loginUser))
              //  change-password
router.patch("/change-password", isLoggedIn, wrapAsync(changePassword));

router.patch("/update-email", isLoggedIn, wrapAsync(updateEmail))

router.post('/logout',logoutUser);

router.delete("/delete", isLoggedIn, wrapAsync(deleteUser));

export default router;
