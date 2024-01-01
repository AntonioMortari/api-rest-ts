import { compare, genSalt, hash } from 'bcrypt'


const SALT_RANDOM = 8

const hashPassword = async (password: string): Promise<string>=> {
    const salt = await genSalt(SALT_RANDOM)

    return hash(password, salt)
}

const comparePassword = async(password: string, hashedPassword: string): Promise<boolean> => {

    return compare(password, hashedPassword)

}

export const PasswordCrypto = {
    hashPassword,
    comparePassword
}