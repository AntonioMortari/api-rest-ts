import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'
import { IQueryParams } from '../../src/server/interfaces/IQueryParams'

testServer

describe('Cities - GetAll', () => {

    it('Solicitar todas as cidades', async () => {

        const res1 = await testServer.get('/cities')

        expect(Array.isArray(res1.body.data)).toBe(true)
        expect(res1.status).toEqual(StatusCodes.OK)

    })

    it('Solicitar todas as cidades passando os query params da forma correta', async () => {

        const queryParams: IQueryParams = { page: 1, limit: 20, filter: 'Região' }

        const res1 = await testServer
            .get('/cities')
            .query(queryParams)

        expect(Array.isArray(res1.body.data)).toBe(true)
        expect(res1.status).toEqual(StatusCodes.OK)

    })

    it('Solicitar todas as cidades passando os query params no formato inválido (string)', async () => {

        const queryParams = {
            page: 'a',
            limit: 'a'
        }

        const res1 = await testServer
            .get('/cities')
            .query(queryParams)

        expect(res1.body).toHaveProperty('message.query.page')
        expect(res1.body).toHaveProperty('message.query.limit')
        expect(res1.status).toEqual(StatusCodes.BAD_REQUEST)

    })
})