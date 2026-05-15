import express from "express";

import recoveryPasswordTeachers from "../Controller/TeachersRecoveryPassword.js";

const router = express.Router ();

router.route ("/requestCOde").post(recoveryPasswordTeachers.requestCode);
router.route("/verifyCode").post(recoveryPasswordTeachers.verifyCode);
router.route("/newPassword").post(recoveryPasswordTeachers.newPassword);

export default router;