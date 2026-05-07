import { Router } from 'express'

const router= Router()

router.use(verifyJWT)

// just like verifyJWT, this time we also need to make middlewares like isAdmin, is superAdmin. Also we can do like this jwt and role ko ek hi middleware k andr daal de (think of it)


router.post("/register", participantRegister)       // add via OAuth

router.post("/login", participantLogin)             // add via OAuth

router.post("/admin/register", adminRequestRegister) // add via OAuth

router.post("/admin/login", adminLogin)     // add via OAuth

router.post("/super-admin/login", superAdminLogin)      // add via OAuth

router.post("/logout", logoutUser)      // logout all user (participant, admin, super-admin)