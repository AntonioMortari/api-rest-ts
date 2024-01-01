import { IUser } from '../../src/server/database/models/User'
import { authenticateUser, createPerson, createUser } from '../utils/createTestData'
import { testServer } from './../jest.setup'
import { StatusCodes } from 'http-status-codes'

describe('Person - GetOne', () => {

    let userData: Omit<IUser, 'id'>
    let acessToken: string
    let personId: number

    beforeAll(async () => {
        userData = await createUser()
        acessToken = await authenticateUser(userData.email, userData.password)
        personId = await createPerson(acessToken)
    })

    it('Buscar por um registro', async () => {

        const res1 = await testServer
            .get(`/person/${personId}`)
            .set('Authorization', `Bearer ${acessToken}`)

        expect(res1.status).toEqual(StatusCodes.OK)
    })

    it('Tentar buscar por um registro sem token de autenticação', async () => {

        const res1 = await testServer
            .get(`/person/${personId}`)

        expect(res1.status).toEqual(StatusCodes.UNAUTHORIZED)
    })

    it('Tenta buscar por um registro passando um param em um formato inválido (string)', async () => {

        const res1 = await testServer
            .get(`/person/a`)
            .set('Authorization', `Bearer ${acessToken}`)

        expect(res1.status).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('message.params.id')
    })

    it('Tenta buscar por um registro que não existe', async () => {

        const res1 = await testServer
            .get('/person/9999')
            .set('Authorization', `Bearer ${acessToken}`)

        expect(res1.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors.default')
    })

})