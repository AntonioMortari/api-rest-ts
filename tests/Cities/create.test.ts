import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'
import { IUser } from '../../src/server/database/models/User'
import { authenticateUser, createUser } from '../utils/createTestData'

describe('Cities - Create', () => {

    let userData: Omit<IUser, 'id'>
    let acessToken: string

    beforeAll(async () => {
        userData = await createUser()
        acessToken = await authenticateUser(userData.email, userData.password)
    })

    it('Criar Registro de Cidade', async () => {

        const res1 = await testServer
            .post('/cities')
            .set('Authorization', `Bearer ${acessToken}`)
            .send({
                name: 'Campinas'
            })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

    })

    it('Tenta criar Cidade com nome menor que 3 caracteres', async () => {

        const res1 = await testServer
            .post('/cities')
            .set('Authorization', `Bearer ${acessToken}`)
            .send({
                name: 'Ca'
            })

        expect(res1.body).toHaveProperty('message.body.name')
        expect(res1.status).toEqual(StatusCodes.BAD_REQUEST)
    })

    it('Tenta criar cidade passando um objeto vazio no body', async () => {

        const res1 = await testServer
            .post('/cities')
            .set('Authorization', `Bearer ${acessToken}`)
            .send({})

        expect(res1.body).toHaveProperty('message.body.name')
        expect(res1.status).toEqual(StatusCodes.BAD_REQUEST)
    })

    it('Tenta criar cidade sem token de autenticação', async () => {

        const res1 = await testServer
            .post('/cities')
            .send({
                name: 'Ca'
            })

        expect(res1.status).toEqual(StatusCodes.UNAUTHORIZED)
    })

})