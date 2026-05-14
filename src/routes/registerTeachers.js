import express from "express";
import registerTeacherController from "../Controller/RegisterTeachersController.js";

const router = express.Router ();

router.route("/").post(registerTeacherController.register)
router.route("/verifyCodeEmail").post(registerTeacherController.verifyCode)