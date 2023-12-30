import * as yup from 'yup'
import { IQueryParams } from '../interfaces/IQueryParams'
import { IParamProps } from '../interfaces/IParamProps'

const queryValidator: yup.Schema<IQueryParams> = yup.object().shape({
    filter: yup.string().notRequired(),
    page: yup.number().notRequired().moreThan(0),
    limit: yup.number().notRequired().moreThan(0)
})

const paramsValidator: yup.Schema<IParamProps> = yup.object().shape({
    id: yup.number().integer().required().moreThan(0)   
})

export {queryValidator, paramsValidator }