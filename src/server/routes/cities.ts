import { Router } from 'express'

import { CitiesController } from '../controllers/Cities'
const citiesController: CitiesController = new CitiesController()

const router = Router()

router.get('/', citiesController.getAllValidation, citiesController.getAll)
router.get('/:id', citiesController.paramsValidation, citiesController.getOne)

router.post('/', citiesController.createValidation, citiesController.create)

router.put('/:id', citiesController.updateValidation, citiesController.update)

router.delete('/:id', citiesController.paramsValidation, citiesController.delete)

export default router