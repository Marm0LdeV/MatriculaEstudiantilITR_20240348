import express from "express";

import recoveryPasswordStudentsController from "../Controller/StudentsrecoveryPassword.js";

const router = express.Router ();

router.route ("/requestCode").post(recoveryPasswordStudentsController.requestCode);
router.route("/verifyCode").post(recoveryPasswordStudentsController.verifyCOde);
router.route("/newPassword").post(recoveryPasswordStudentsController.newPassword);

export default router;