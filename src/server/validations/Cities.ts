import * as yup from 'yup'

// interfaces
import { ICity } from '../database/models/City'
import { IQueryParams } from '../interfaces/IQueryParams'
import { IParamProps } from '../interfaces/IParamProps'

interface IBodyProps extends Omit<ICity, 'id'> {}

const bodyValidator: yup.Schema<IBodyProps> = yup.object().shape({
    name: yup.string().required().min(3).max(150),
})

const queryValidator: yup.Schema<IQueryParams> = yup.object().shape({
    filter: yup.string().notRequired(),
    page: yup.number().notRequired().moreThan(0),
    limit: yup.number().notRequired().moreThan(0)
})

const paramsValidator: yup.Schema<IParamProps> = yup.object().shape({
    id: yup.number().integer().required().moreThan(0)   
})

export { bodyValidator, queryValidator, paramsValidator }