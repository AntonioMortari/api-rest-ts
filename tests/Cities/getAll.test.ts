import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'
import { IQueryParams } from '../../src/server/interfaces/IQueryParams'
import { authenticateUser, createCity, createUser } from '../utils/createTestData'
import { IUser } from '../../src/server/database/models/User'

describe('Cities - GetAll', () => {

    let userData: Omit<IUser, 'id'>
    let acessToken: string
    let cityId: number

    beforeAll(async () => {
        userData = await createUser()
        acessToken = await authenticateUser(userData.email, userData.password)
        cityId = await createCity(acessToken)
    })

    it('Solicitar todas as cidades', async () => {

        const res2 = await testServer
            .get('/cities')
            .set('Authorization', `Bearer ${acessToken}`)

        expect(Array.isArray(res2.body)).toBe(true)
        expect(res2.status).toEqual(StatusCodes.OK)

    })

    it('Tentar buscar todas as cidades sem token de autorização', async () => {

        const res2 = await testServer
            .get('/cities')

        expect(res2.status).toEqual(StatusCodes.UNAUTHORIZED)

    })

    it('Buscar por todas as pessoas passando os query params da forma correta', async () => {

        const queryParams: IQueryParams = { page: 1, limit: 20, filter: 'Ca' }

        const res2 = await testServer
            .get('/cities')
            .set('Authorization', `Bearer ${acessToken}`)
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
            .set('Authorization', `Bearer ${acessToken}`)
            .query(queryParams)

        expect(res1.body).toHaveProperty('message.query.page')
        expect(res1.body).toHaveProperty('message.query.limit')
        expect(res1.status).toEqual(StatusCodes.BAD_REQUEST)

    })
})