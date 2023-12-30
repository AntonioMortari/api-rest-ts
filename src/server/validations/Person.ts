import * as yup from 'yup'
import { IPerson } from '../database/models/Person'

interface IBodyProps extends Omit<IPerson, 'id'> {}

const bodyValidator: yup.Schema<IBodyProps> = yup.object().shape({
    fullName: yup.string().required().max(150).nonNullable(),
    email: yup.string().email().required().nonNullable().max(150),
    city_id: yup.number().integer().nonNullable().required()
})

const updateBodyValidator: yup.Schema<Partial<IBodyProps>> = yup.object().shape({
    fullName: yup.string().max(150).nonNullable(),
    email: yup.string().email().max(150).nonNullable(),
    city_id: yup.number().integer().nonNullable()
})

export { bodyValidator, updateBodyValidator}