

import { NextFunction, Response, Request } from 'express'
import { validator } from '../../middlewares/validation'
import { bodyValidator, paramsValidator, queryValidator } from '../../validations/Cities'

const createValidationMiddleware = validator({
    body: bodyValidator
})

const getAllValidationMiddleware = validator({
    query: queryValidator
})

const paramsValidationMiddleware = validator({
    params: paramsValidator
})

const updateValidationMiddleware = validator({
    body: bodyValidator,
    params: paramsValidator
})

class CitiesValidator {
    getAllValidation(req: Request, res: Response, next: NextFunction) {
        getAllValidationMiddleware(req, res, next)
    }

    paramsValidation(req: Request, res: Response, next: NextFunction) {
        paramsValidationMiddleware(req, res, next)
    }

    createValidation(req: Request, res: Response, next: NextFunction) {
        createValidationMiddleware(req, res, next)
    }

    updateValidation(req: Request, res: Response, next: NextFunction) {
        updateValidationMiddleware(req, res, next)
    }
}

export { CitiesValidator }