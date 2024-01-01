import { NextFunction, Response, Request } from "express"
import { validator } from "../../middlewares/validation"
import { signUpValidator } from "../../validations/User"
import { signInValidator } from "../../validations/User"


const signInValidationMiddleware = validator({
    body: signInValidator
})

const signUpValidationMiddleware = validator({
    body: signUpValidator
})

class UserValidation {

    signInValidation(req: Request, res:Response, next: NextFunction){
        signInValidationMiddleware(req,res,next)
    }

    signUpValidation(req: Request, res:Response, next: NextFunction){
        signUpValidationMiddleware(req,res,next)
    }

}

export { UserValidation }