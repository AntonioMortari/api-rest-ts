import { IPerson } from '../models/Person'

import Knex from '../knex'
import { ETableNames } from '../knex/ETableNames'


class PersonProvider {

    async getAll(fullname: string, email:string, page: number, limit: number): Promise<IPerson[] | Error> {

        try {
            const result = await Knex(ETableNames.person)
                .select('*')
                .where('fullname', 'like', `%${fullname}%`)
                .where('email', 'like', `%${email}%`)
                .offset((page - 1) * limit)
                .limit(limit)

            if (result) return result

            return new Error('Erro ao buscar por registros')


        } catch (error) {
            console.log(error)
            return new Error('Erro ao buscar por registros')
        }

    }

    async getOne(id: number): Promise<IPerson | Error> {

        try {
            const [result] = await Knex(ETableNames.person).select('*').where('id', id)

            if (!result) return new Error('Registro não encontrado')

            return result

        } catch (error) {
            console.log(error)
            return new Error(`Erro ao buscar por registro de id ${id}`)
        }

    }

    async create(person: Omit<IPerson, 'id'>): Promise<number | Error> {

        try {
            const [result] = await Knex(ETableNames.person).insert(person).returning('id')

            console.log(result)

            if (typeof result == 'number') return result

            if (typeof result == 'object') return result.id

            return new Error('Erro ao criar pessoa')

        } catch (error) {
            console.log(error)
            return new Error('Erro ao criar pessoa')
        }
    }

    async update(id: number, person: Omit<IPerson, 'id'>): Promise<void | Error> {

        try {
            const result = await Knex(ETableNames.person).where('id', id).update(person)

            if (result > 0) return

            return new Error('Erro ao atualizar dados de pessoa')

        } catch (error) {
            console.log(error)
            return new Error('Erro ao atualizar dados de pessoa')
        }

    }

    async delete(id: number): Promise<void | Error> {

        try {
            const result = await Knex(ETableNames.person).where('id', id).del()

            if (result > 0) return

            return new Error('Erro ao deletar pessoa')

        } catch (error) {
            console.log(error)
            return new Error('Erro ao deletar pessoa')
        }

    }

}

export { PersonProvider }