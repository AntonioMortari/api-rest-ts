import { NextFunction, Request, Response } from 'express'

// libs
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

// interfaces
import { ICity } from '../interfaces/ICity'

// utils
import { validator } from '../middlewares/validation'
import { bodyValidator, queryValidator } from '../../validations'



const createValidationMiddleware = validator({
    body: bodyValidator
})

const getAllValidationMiddleware = validator({
    query: queryValidator
})


class CitiesController {

    getAllValidation(req: Request, res: Response, next: NextFunction){
        getAllValidationMiddleware(req, res, next)
    }

    createValidation(req: Request, res: Response, next: NextFunction) {
        createValidationMiddleware(req, res, next)
    }

    getAll() { }

    getOne() { }

    create(req: Request, res: Response) {

        res.send('Não implementado')

    }

    update() { }

    delete() { }

}

export { CitiesController }