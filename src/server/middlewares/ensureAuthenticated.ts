import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { JwtService } from '../services/JwtService'


const ensureAuthenticated: RequestHandler = (req, res, next) => {

    const { authorization } = req.headers

    if (!authorization) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            erros: {
                default: 'Não autenticado'
            }
        })
    }

    const [typeOfToken, token] = authorization.split(' ')
    if (typeOfToken != 'Bearer') {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            erros: {
                default: 'Não autenticado'
            }
        })
    }

    const decoded = JwtService.verify(token)

    if (decoded === 'JWT_SECRET_NOT_FOUND') {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Erro ao gerar token de autenticão'
            }
        })
    }

    if (decoded === 'INVALID_TOKEN') {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            erros: {
                default: 'Não autenticado'
            }
        })
    }

    req.headers.idUser = decoded.uid.toString()

    return next()

}

export { ensureAuthenticated }
