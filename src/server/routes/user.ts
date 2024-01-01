import { Router } from "express"

const router = Router()

import { UserController } from '../controllers/User'
const userController: UserController = new UserController()

router.post('/signIn', userController.signInValidation, userController.signIn)
router.post('/signUp', userController.signUpValidation, userController.signUp)

export default router