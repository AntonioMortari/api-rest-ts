import { IUser } from './../database/models/User'

import * as yup from 'yup'

const bodyValidator: yup.Schema<Omit<IUser, 'id'>> = yup.object().shape({
    name: yup.string().required().min(3),
    email: yup.string().email().min(5).required(),
    password: yup.string().required().min(6)
})

const emailValidator = yup.object().shape({
    email: yup.string().email().min(5).required()
})

export {bodyValidator, emailValidator}