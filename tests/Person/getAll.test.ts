import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'
import { IPerson } from '../../src/server/database/models/Person'

interface IQueryParams extends Partial<Omit<IPerson, 'id'>>{
    page: number,
    limit:number
}

describe('Person - GetAll', () => {

    it('Buscar todas as pessoas', async () => {

        const res1 = await testServer.get('/person')

        expect(Array.isArray(res1.body)).toBe(true)
        expect(res1.status).toEqual(StatusCodes.OK)

    })

    it('Buscar por todas as pessoas passando os query params da forma correta', async () => {

        const queryParams: IQueryParams = { page: 1, limit: 20, fullName:'A'}

        const res1 = await testServer
            .get('/person')
            .query(queryParams)

        expect(Array.isArray(res1.body)).toBe(true)
        expect(res1.status).toEqual(StatusCodes.OK)

    })

    it('Solicitar todas as cidades passando os query params no formato inválido (string)', async () => {

        const queryParams = {
            page: 'a',
            limit: 'a'
        }

        const res1 = await testServer
            .get('/person')
            .query(queryParams)

        expect(res1.body).toHaveProperty('message.query.page')
        expect(res1.body).toHaveProperty('message.query.limit')
        expect(res1.status).toEqual(StatusCodes.BAD_REQUEST)

    })
})