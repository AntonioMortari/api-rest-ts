import { Request, Response } from 'express'

import { StatusCodes } from 'http-status-codes'
import { IUser } from '../../database/models/User'
import { UserValidation } from './UserValidation'

// provider
import { UserProvider } from '../../database/providers/User'
const userProvider: UserProvider = new UserProvider()

// services
import { PasswordCrypto } from '../../services/PasswordCrypto'
import { JwtService } from '../../services/JwtService'

interface IBodyProps extends Omit<IUser, 'id'> { }

class UserController extends UserValidation {


    async signIn(req: Request<{}, {}, Omit<IBodyProps, 'name'>>, res: Response) {

        const { email, password } = req.body

        const result = await userProvider.getByEmail(email)

        if (result instanceof Error) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                errors: {
                    default: 'Email ou senha incorretos'
                }
            })
        }

        const passwordMatch = await PasswordCrypto.comparePassword(
            password,
            result.password
        )
        if (!passwordMatch) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                errors: {
                    default: 'Email ou senha incorretos'
                }
            })
        } else {

            const token = JwtService.sign({uid: result.id})

            if(token === 'JWT_SECRET_NOT_FOUND'){
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    errors: {
                        default: 'Erro ao gerar token de autenticão'
                    }
                })
            }

            return res.status(StatusCodes.OK).json({
                acessToken: token
            })
        }

    }

    async signUp(req: Request<{}, {}, IBodyProps>, res: Response) {

        const result = await userProvider.create(req.body)

        if (result instanceof Error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: result.message
                }
            })
        }

        res.status(StatusCodes.CREATED).json(result)

    }

}

export { UserController }