import {Request, Response} from 'express'

// libs
import {StatusCodes} from 'http-status-codes'
import * as yup from 'yup'

interface ICidade{
    name: string,
}

const bodyValidation: yup.Schema<ICidade> = yup.object().shape({
    name: yup.string().required()   
})  

class CitiesController {

    index(req: Request, res: Response){
        res.send('ok')
    }

    show(req: Request, res: Response){

    }

    async create(req: Request<{},{}, ICidade>, res: Response){
        
        try {
            await bodyValidation.validate(req.body)

            res.status(StatusCodes.OK).json(req.body)
        } catch (error) {
            console.log(error)
            const yupError = error as yup.ValidationError
            res.status(StatusCodes.BAD_REQUEST).json({errors:yupError.errors})
        }
    }

    update(req: Request, res: Response){

    }

    delete(req: Request, res: Response){

    }

}

export { CitiesController }