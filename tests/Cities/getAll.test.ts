import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'
import { IQueryParams } from '../../src/server/interfaces/IQueryParams'
import { createCity, createPerson } from '../utils/createTestData'

describe('Cities - GetAll', () => {

    let personId: number
    let cityId: number

    beforeAll(async () => {
        try {
            cityId = await createCity()
            personId = await createPerson()
        } catch (error) {
            console.error('Erro ao criar os registros:', error)
        }
    })

    it('Solicitar todas as cidades', async () => {

        const res2 = await testServer.get('/cities')

        expect(Array.isArray(res2.body)).toBe(true)
        expect(res2.status).toEqual(StatusCodes.OK)

    })

    it('Buscar por todas as pessoas passando os query params da forma correta', async () => {

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