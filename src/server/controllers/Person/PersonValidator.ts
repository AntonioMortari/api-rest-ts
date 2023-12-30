
import { updateBodyValidator, bodyValidator } from "../../validations/Person"
import { queryValidator } from "../../validations"
import { paramsValidator } from "../../validations"

import { validator } from '../../middlewares/validation'

import { NextFunction, Request, Response } from "express"

const getAllValidationMiddleware = validator({
    query: queryValidator
})

const paramsValidationMiddleware = validator({
    params: paramsValidator
})

const createValidationMiddleware = validator({
    body: bodyValidator
})

const updateValidationMiddleware = validator({
    params: paramsValidator,
    body: updateBodyValidator
})


class PersonValidator {

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

export { PersonValidator }