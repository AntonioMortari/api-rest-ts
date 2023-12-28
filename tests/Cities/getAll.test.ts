import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'
import { IQueryParams } from '../../src/server/interfaces/IQueryParams'

testServer

describe('Cities - GetAll', () => {

    it('Solicitar todas as cidades', async () => {

        const res1 = await testServer.post('/cities').send({
            name:'Campinas'
        })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const res2 = await testServer.get('/cities')

        expect(Array.isArray(res2.body)).toBe(true)
        expect(res2.status).toEqual(StatusCodes.OK)

    })

    it('Solicitar todas as cidades passando os query params da forma correta', async () => {

        const res1 = await testServer.post('/cities').send({
            name:'Campinas'
        })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const queryParams: IQueryParams = { page: 1, limit: 20, filter: 'Ca' }

        const res2 = await testServer
            .get('/cities')
            .query(queryParams)

        expect(Array.isArray(res2.body)).toBe(true)
        expect(res2.status).toEqual(StatusCodes.OK)

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