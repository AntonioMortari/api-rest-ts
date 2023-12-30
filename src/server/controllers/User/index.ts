import { Request, Response } from 'express'

import { StatusCodes } from 'http-status-codes'
import { IUser } from '../../database/models/User'
import { UserValidation } from './UserValidation'

// provider
import { UserProvider } from '../../database/providers/User'
const userProvider: UserProvider = new UserProvider()

interface IBodyProps extends Omit<IUser,'id'>{}

class UserController extends UserValidation {


    async signIn(req: Request, res: Response){
        // login
    }

    async signUp(req: Request<{}, {}, IBodyProps>, res: Response){
        
        const result = await userProvider.create(req.body)

        if(result instanceof Error){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors:{
                    default: result.message
                }
            })
        }

        res.status(StatusCodes.OK).json(result)

    }

}

export { UserController }