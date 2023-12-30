import { Request, Response } from 'express'
import { IPerson } from '../../database/models/Person'

import { StatusCodes } from 'http-status-codes'
import { IParamProps } from '../../interfaces/IParamProps'

// provider
import { PersonProvider } from '../../database/providers/Person'
import { PersonValidator } from './PersonValidator'
const personProvider: PersonProvider = new PersonProvider

interface IBodyParams extends Omit<IPerson, 'id'> { }
interface IQueryParams extends Partial<Omit<IPerson, 'id'>> {
    limit?: number,
    page?:number,
}

class PersonController extends PersonValidator {

    async getAll(req: Request<{}, {}, {}, IQueryParams>, res: Response) {

        const result = await personProvider.getAll(
            req.query.fullName || '',
            req.query.email || '',
            req.query.page || 1,
            req.query.limit || 7
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
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: 'O parâmetro id é obrigatório'
                }
            })
        }

        const result = await personProvider.getOne(req.params.id)

        if (result instanceof Error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: result.message
                }
            })
        }

        res.status(StatusCodes.OK).json(result)

    }

    async create(req: Request<{}, {}, IBodyParams>, res: Response) {

        const result = await personProvider.create(req.body)

        if (result instanceof Error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: result.message
                }
            })
        }

        res.status(StatusCodes.CREATED).json(result)

    }

    async update(req: Request<IParamProps, {}, IBodyParams>, res: Response) {
        if (!req.params.id) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: 'O parâmetro id é obrigatório'
                }
            })
        }

        const result = await personProvider.update(req.params.id, req.body)

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

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: 'O parâmetro id é obrigatório'
                }
            })
        }

        const result = await personProvider.delete(req.params.id)

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

export { PersonController }