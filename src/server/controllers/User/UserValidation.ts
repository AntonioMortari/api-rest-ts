import { NextFunction, Response, Request } from "express"
import { validator } from "../../middlewares/validation"
import { bodyValidator } from "../../validations/User"
import { emailValidator } from "../../validations/User"


const getByEmailValidationMiddleware = validator({
    body: emailValidator
})

const createValidationMiddleware = validator({
    body: bodyValidator
})

class UserValidation {

    getByEmailValidation(req: Request, res:Response, next: NextFunction){
        getByEmailValidationMiddleware(req,res,next)
    }

    createValidation(req: Request, res:Response, next: NextFunction){
        createValidationMiddleware(req,res,next)
    }

}

export { UserValidation }