import { ICity } from '../models/City'

import Knex from '../knex'
import { IQueryParams } from '../../interfaces/IQueryParams'
import { ETableNames } from '../knex/ETableNames'

class CitiesProvider {

    async getAll(page: number, limit: number, filter: string): Promise<ICity[] | Error> {

        try {
            const result = await Knex(ETableNames.city)
                .select()
                .where('name', 'like', `%${filter}%`)
                .offset((page - 1) * limit)
                .limit(limit)

            return result
        } catch (error) {
            console.log(error)
            return new Error('Erro ao consultar os registros')
        }
    }

    async getOne(id: number): Promise<ICity | Error> {

        try {
            const [result] = await Knex(ETableNames.city)
                .select('*')
                .where('id', id)


            if (result) return result

            return new Error(`Registro de id ${id} não encontrado`)
        } catch (error) {
            console.log(error)
            return new Error(`Erro ao consultar cidade de id ${id}`)
        }
    }

    async create(city: Omit<ICity, 'id'>): Promise<number | Error> {

        try {
            const [result] = await Knex(ETableNames.city)
                .insert(city)
                .returning('id')

            if (typeof result == 'object') {
                return result.id
            } else if (typeof result == 'number') {
                return result
            }

            return new Error('Erro ao criar cidade')
        } catch (error) {
            console.log(error)
            return new Error('Erro ao criar cidade')
        }

    }

    async update(id: number, city: Omit<ICity, 'id'>): Promise<void | Error> {
        try {
            const result = await Knex(ETableNames.city)
                .where('id', id)
                .update(city)

            if(result) return 

            return new Error('Erro ao atualizar dados')

        } catch (error) {
            console.log(error)
            return new Error('Erro ao atualizar dados')
        }
    }

    async delete(id: number): Promise<void | Error> {

        try {
            const result = await Knex(ETableNames.city).where('id', id).del()

            if (result > 0) return

            return new Error(`Erro ao deletar cidade de id ${id}`)
        } catch (error) {
            console.log(error)
            return new Error(`Erro ao deletar cidade de id ${id}`)
        }
    }
}

export { CitiesProvider }