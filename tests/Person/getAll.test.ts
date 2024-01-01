import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'
import { IPerson } from '../../src/server/database/models/Person'
import { IUser } from '../../src/server/database/models/User'
import { authenticateUser, createPerson, createUser } from '../utils/createTestData'

interface IQueryParams extends Partial<Omit<IPerson, 'id'>> {
    page: number,
    limit: number
}

describe('Person - GetAll', () => {

    let userData: Omit<IUser, 'id'>
    let acessToken: string
    let personId: number

    beforeAll(async () => {
        userData = await createUser()
        acessToken = await authenticateUser(userData.email, userData.password)
        personId = await createPerson(acessToken)
    })

    it('Buscar todas as pessoas', async () => {

        const res1 = await testServer
            .get('/person')
            .set('Authorization', `Bearer ${acessToken}`)

        expect(Array.isArray(res1.body)).toBe(true)
        expect(res1.status).toEqual(StatusCodes.OK)

    })

    it('Tentar buscar todas as pessoas sem token de autenticação', async () => {

        const res1 = await testServer
            .get('/person')

        expect(res1.status).toEqual(StatusCodes.UNAUTHORIZED)

    })

    it('Buscar por todas as pessoas passando os query params da forma correta', async () => {

        const queryParams: IQueryParams = { page: 1, limit: 20, fullName: 'A' }

        const res1 = await testServer
            .get('/person')
            .set('Authorization', `Bearer ${acessToken}`)
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
            .set('Authorization', `Bearer ${acessToken}`)
            .query(queryParams)

        expect(res1.body).toHaveProperty('message.query.page')
        expect(res1.body).toHaveProperty('message.query.limit')
        expect(res1.status).toEqual(StatusCodes.BAD_REQUEST)

    })
})