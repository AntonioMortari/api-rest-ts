import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

import { authenticateUser, createCity, createUser } from '../utils/createTestData'
import { IUser } from '../../src/server/database/models/User'

describe('Cities - Update', () => {

    let userData: Omit<IUser, 'id'>
    let acessToken: string
    let cityId: number

    beforeAll(async () => {
        userData = await createUser()
        acessToken = await authenticateUser(userData.email, userData.password)
        cityId = await createCity(acessToken)
    })

    it('Atualizar registro', async () => {

        const res1 = await testServer
            .put(`/cities/${cityId}`)
            .set('Authorization', `Bearer ${acessToken}`)
            .send({
                name: 'Hortolândia'
            })

        expect(res1.status).toEqual(StatusCodes.NO_CONTENT)
    })

    it('Tentar atualizar registro sem token de autenticação', async () => {

        const res1 = await testServer
            .put(`/cities/${cityId}`)
            .send({
                name: 'Hortolândia'
            })

        expect(res1.status).toEqual(StatusCodes.UNAUTHORIZED)
    })

    it('Tentar atualizar registro com id em um formato inválido (string)', async () => {
        const res1 = await testServer
            .put('/cities/a')
            .set('Authorization', `Bearer ${acessToken}`)
            .send({
                name: 'Campinas'
            })

        expect(res1.status).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('message.params.id')

    })

    it('Tentar atualizar registro sem passar dados no body', async () => {

        const res1 = await testServer
            .put(`/cities/${cityId}`)
            .set('Authorization', `Bearer ${acessToken}`)
            .send({})

        expect(res1.status).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('message.body.name')


    })

    it('Tentar atualizar registro passando um name com menos de 3 caracteres', async () => {

        const res1 = await testServer
            .put(`/cities/${cityId}`)
            .set('Authorization', `Bearer ${acessToken}`)
            .send({
                name: 'Ca'
            })

        expect(res1.status).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('message.body.name')

    })

    it('Tentar atualizar um registro que não existe', async () => {

        const res1 = await testServer
            .put('/cities/99999')
            .set('Authorization', `Bearer ${acessToken}`)
            .send({ name: 'Campinas' })

        expect(res1.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors.default')

    })

})