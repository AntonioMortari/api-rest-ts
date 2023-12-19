import * as yup from 'yup'

// interfaces
import { ICity } from '../server/interfaces/ICity'
import { IQueryParams } from '../server/interfaces/IQueryParams'

const bodyValidator: yup.Schema<ICity> = yup.object().shape({
    name: yup.string().required().min(3),
    
})

const queryValidator: yup.Schema<IQueryParams> = yup.object().shape({
    filter: yup.string().notRequired(),
    page: yup.number().notRequired().moreThan(0),
    limit: yup.number().notRequired().moreThan(0)
})

export { bodyValidator, queryValidator }