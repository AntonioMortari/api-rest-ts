import {Router} from 'express'

import { CitiesController } from '../controllers/Cities'
const citiesController: CitiesController = new CitiesController()

const router = Router()

router.get('/', citiesController.index)
router.get('/:id', citiesController.show)

router.post('/', citiesController.create)

router.put('/:id', citiesController.update)
router.delete('/:id', citiesController.delete)

export default router