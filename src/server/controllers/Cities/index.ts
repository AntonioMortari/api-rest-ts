import { NextFunction, Request, Response } from 'express'

// libs
import { StatusCodes } from 'http-status-codes'

// interfaces
import { IQueryParams } from '../../interfaces/IQueryParams'
import { IParamProps } from '../../interfaces/IParamProps'

// utils
import { CitiesValidator } from './CitiesValidator'
import { ICity } from '../../database/models/City'

// provider
import { CitiesProvider } from '../../database/providers/Cities'
const citiesProvider: CitiesProvider = new CitiesProvider()

interface IBodyProps extends Omit<ICity, 'id'> { }

class CitiesController extends CitiesValidator {

    async getAll(req: Request<{}, {}, {}, IQueryParams>, res: Response) {
        const result = await citiesProvider.getAll(
            req.query.page || 1,
            req.query.limit || 7,
            req.query.filter || ''
        )

        if (result instanceof Error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: result.message
                }
            })
        }

        res.status(StatusCodes.OK).json(result)
    }

    async getOne(req: Request<IParamProps>, res: Response) {
        if (!req.params.id) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                errors: {
                    default: 'O parâmetro id é obrigatório'
                }
            })
        }

        const result = await citiesProvider.getOne(req.params.id)

        if (result instanceof Error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: result.message
                }
            })
        }

        res.status(StatusCodes.OK).json(result)
    }

    async create(req: Request<{}, {}, IBodyProps>, res: Response) {

        const result = await citiesProvider.create(req.body)

        if (result instanceof Error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: result.message
                }
            })
        }

        res.status(StatusCodes.CREATED).json(result)
    }

    async update(req: Request<IParamProps, {}, IBodyProps>, res: Response) {
        if (!req.params.id) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                errors: {
                    default: 'O parâmetro id é obrigatório'
                }
            })
        }

        const result = await citiesProvider.update(req.params.id, req.body)

        if (result instanceof Error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: result.message
                }
            })
        }

        res.status(StatusCodes.NO_CONTENT).send()
    }

    async delete(req: Request<IParamProps>, res: Response) {
        if (!req.params.id) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                errors: {
                    default: 'O parâmetro id é obrigatório'
                }
            })
        }

        const result = await citiesProvider.delete(req.params.id)

        if (result instanceof Error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: result.message
                }
            })
        }

        res.status(StatusCodes.NO_CONTENT).send()
    }

}

export { CitiesController }