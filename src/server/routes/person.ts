import { Router } from 'express'
const router = Router()

import { PersonController } from '../controllers/Person'
const personController: PersonController = new PersonController


router.get('/', personController.getAllValidation, personController.getAll)
router.get('/:id', personController.paramsValidation, personController.getOne)

router.post('/', personController.createValidation, personController.create)

router.put('/:id', personController.updateValidation, personController.update)

router.delete('/:id', personController.paramsValidation, personController.delete)


export default router