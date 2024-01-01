import { PasswordCrypto } from '../../services/PasswordCrypto'
import Knex from '../knex'
import { ETableNames } from '../knex/ETableNames'
import { IUser } from '../models/User'


class UserProvider {

    async create(user: Omit<IUser, 'id'>): Promise<number | Error> {

        const hashPassword = await PasswordCrypto.hashPassword(user.password)

        try {
            const [result] = await Knex(ETableNames.user).insert(
                {
                    ...user,
                    password: hashPassword
                }
            ).returning('id')

            if (typeof result == 'object') return result.id
            if (typeof result == 'number') return result

            return new Error('Erro ao criar usuário')
        } catch (error) {
            console.log(error)
            return new Error('Erro ao criar usuário')
        }

    }

    async getByEmail(email: string): Promise<IUser | Error> {
        try {
            const [result] = await Knex(ETableNames.user)
                .select('*')
                .where('email', '=', email)

            if (result) return result

            if (!result) return new Error(`Pessoa de email ${email} não cadastrada`)
            return new Error('Erro ao buscar por usuário')
        } catch (error) {
            console.log(error)
            return new Error('Erro ao buscar por usuário')
        }
    }

}

export { UserProvider }