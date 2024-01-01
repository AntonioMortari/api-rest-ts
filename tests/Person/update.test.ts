import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'
import { authenticateUser, createCity, createPerson, createUser } from '../utils/createTestData'
import { IUser } from '../../src/server/database/models/User'

describe('Person - Update', () => {

    let userData: Omit<IUser, 'id'>
    let acessToken: string
    let cityId: number
    let personId: number

    beforeAll(async () => {
        userData = await createUser()
        acessToken = await authenticateUser(userData.email, userData.password)
        cityId = await createCity(acessToken)
        personId = await createPerson(acessToken)
    })

    it('Atualizar um registro', async () => {

        const res1 = await testServer.put(`/person/${personId}`).send({
            email: 'emailatualizado@teste.com'
        }).set('Authorization', `Bearer ${acessToken}`)

        expect(res1.status).toEqual(StatusCodes.NO_CONTENT)
    })

    it('Tentar atualizar um registro sem token de autenticação', async () => {

        const res1 = await testServer.put(`/person/${personId}`).send({
            email: 'emailatualizado@teste.com'
        })

        expect(res1.status).toEqual(StatusCodes.UNAUTHORIZED)
    })

    it('Tentar atualizar um registro que não existe', async () => {
        const res1 = await testServer
            .put('/person/9999')
            .set('Authorization', `Bearer ${acessToken}`)

        expect(res1.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors.default')
    })

    it('Tentar atualizar um registro passando um param em um formato inválido (string)', async () => {
        const res1 = await testServer
            .put(`/person/a`)
            .set('Authorization', `Bearer ${acessToken}`)

        expect(res1.status).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('message.params.id')
    })

    it('Tentar atualizar um registro com email inválido', async () => {
        const res1 = await testServer.put(`/person/${personId}`).send({
            email: 'testandmetodoupdate@',
        }).set('Authorization', `Bearer ${acessToken}`)

        expect(res1.status).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('message.body.email')
    })

    it('Tentar atualizar um registro com id de cidade inexistente', async () => {
        const res1 = await testServer.put(`/person/${personId}`).send({
            city_id: 999
        }).set('Authorization', `Bearer ${acessToken}`)

        expect(res1.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors.default')
    })

    // it('Tentar atualizar um registro com email já cadastrado', async () => {
    //     const res1 = await testServer.put(`/person/${personId}`).send({
    //         email: 'teste@jest.com',
    //     })

    //     expect(res1.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    //     expect(res1.body).toHaveProperty('errors.default')
    // })
})