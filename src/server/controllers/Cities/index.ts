import { NextFunction, Request, Response } from 'express'

// libs
import { StatusCodes } from 'http-status-codes'

// interfaces
import { IQueryParams } from '../../interfaces/IQueryParams'
import { IParamProps } from '../../interfaces/IParamProps'

// utils
import { CitiesValidator } from './CitiesValidator'
import { ICity } from '../../database/models/City'

interface IBodyProps extends Omit<ICity, 'id'>{}

class CitiesController extends CitiesValidator {

    getAll(req: Request<{}, {}, {}, IQueryParams>, res: Response) {
        res.status(StatusCodes.OK).json({ data: [] })
    }

    getOne(req: Request<IParamProps>, res: Response) {

        if (req.params.id == 99999) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: 'Registro não encontrado'
                }
            })
        }

        res.status(StatusCodes.OK).json({})
    }

    create(req: Request<{}, {}, IBodyProps>, res: Response) {
        res.status(StatusCodes.CREATED).json({ id: 1 })
    }

    update(req: Request<IParamProps, {}, IBodyProps>, res: Response) {

        if (req.params.id == 99999) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: 'Registro não encontrado'
                }
            })
        }

        res.status(StatusCodes.OK).json({ message: 'Atualizado com sucesso' })
    }

    delete(req: Request<IParamProps>, res: Response) {

        if (req.params.id == 99999) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: 'Registro não encontrado'
                }
            })
        }

        res.status(StatusCodes.OK).json({ message: 'Deletado com sucesso' })
    }

}

export { CitiesController }