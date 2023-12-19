import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Schema, ValidationError } from 'yup'

type TField = 'body' | 'header' | 'params' | 'query'

type TAllSchemas = Record<TField, Schema>

type TValidator = (schemas: Partial<TAllSchemas>) => RequestHandler

type TErrorsResult = Record<string, Record<string, string>>

const validator: TValidator = (schemas) => {

    return (req,res,next) => {

        const errorsResult: TErrorsResult = {}

        Object.entries(schemas).forEach(([key, schema]) => {
            try {
                schema.validateSync(req[key as TField], {abortEarly:false})
            } catch (error) {
                const yupError = error as ValidationError

                const errors: Record<string,string> = {}

                yupError.inner.forEach(error => {
                    if(!error.path) return

                    errors[error.path] = error.message
                })

                errorsResult[key] = errors
            }
        })

        if(!Object.entries(errorsResult).length){
            next()
        }else{
            return res.status(StatusCodes.BAD_REQUEST).json({message: errorsResult})
        }


    }
}

export { validator }