import { Router } from 'express'
import * as user from '../controller/user.controller'
import { verifyJWT } from '../middlewares/verifyJWT';

const router: Router= Router()

// just like verifyJWT, this time we also need to make middlewares like isAdmin, is superAdmin. Also we can do like this jwt and role ko ek hi middleware k andr daal de (think of it)


router.get("/health", (req, res) => res.json({message: "Server is healthy"}))

router.get('/auth/google/register', user.googleParticipantRedirect);         

router.get('/auth/google/register/callback', user.googleParticipantCallback)

router.get('/auth/google/login', user.googleParticipantLoginRedirect);         

router.get('/auth/google/login/callback', user.googleParticipantLoginCallback)

router.get('/auth/google/admin/register', user.googleAdminRedirect);         

router.get('/auth/google/admin/register/callback', user.googleAdminCallback)

router.get('/auth/google/admin/login', user.googleAdminLoginRedirect);         

router.get('/auth/google/admin/login/callback', user.googleAdminLoginCallback)

router.get('/auth/google/superAdmin/login', user.googleSuperadminLoginRedirect);         

router.get('/auth/google/superAdmin/login/callback', user.googleSuperadminLoginCallback)

router.post("/logout", verifyJWT, user.logoutUser)      // logout all user (participant, admin, super-admin)


export default router;