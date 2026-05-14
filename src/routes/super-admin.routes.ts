import { Router } from 'express'
import { verifyJWT } from '../middlewares/verifyJWT'
import { authorize } from '../middlewares/verifyRole'
import * as superAdminController from "../controller/super-admin.controller"

const router: Router = Router()

router.get('/pendingAdmin', verifyJWT, authorize('super-admin'), superAdminController.getPendingAdmins)

router.patch("/:adminId/manage", verifyJWT, authorize('super-admin'), superAdminController.manageApproval)

router.get("/admins", verifyJWT, authorize('super-admin', 'admin'), superAdminController.getApprovedAdmins)       // list of all approved admins

router.delete("/admin/:adminId", verifyJWT, authorize("super-admin"), superAdminController.deleteAdmin)

// create groups when game starts (to be handled in detail)

// disqualify group from the game

// start the game

// finish the game ()

// allocate extra points to each team depending upon the level reached


export default router