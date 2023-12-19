import * as yup from 'yup'

const yupValidationError = (yupError: yup.ValidationError): Record<string,string> => {

    const errors: Record<string,string> = {}

    yupError.inner.forEach(error => {
        if(!error.path) return

        errors[error.path] = error.message
    })

    return errors

}

export { yupValidationError }