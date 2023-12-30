import * as yup from 'yup'

// interfaces
import { ICity } from '../database/models/City'

interface IBodyProps extends Omit<ICity, 'id'> {}

const bodyValidator: yup.Schema<IBodyProps> = yup.object().shape({
    name: yup.string().required().min(3).max(150),
})

export { bodyValidator }