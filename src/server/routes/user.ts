import { Router } from "express"

const router = Router()

import { UserController } from '../controllers/User'
const userController: UserController = new UserController()

router.post('/signIn', userController.signIn)
router.post('/signUp', userController.createValidation, userController.signUp)

export default router