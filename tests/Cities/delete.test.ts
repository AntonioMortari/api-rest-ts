import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

import { authenticateUser, createCity, createUser } from '../utils/createTestData'
import { IUser } from '../../src/server/database/models/User'

describe('Cities - Delete', () => {

    let userData: Omit<IUser, 'id'>
    let acessToken: string
    let cityId: number

    beforeAll(async () => {
        userData = await createUser()
        acessToken = await authenticateUser(userData.email, userData.password)
        cityId = await createCity(acessToken)
    })

    it('Deletar um registro', async () => {

        const res1 = await testServer
            .delete(`/cities/${cityId}`)
            .set('Authorization', `Bearer ${acessToken}`)

        expect(res1.status).toEqual(StatusCodes.NO_CONTENT)
    })

    it('Tentar deletar um registro sem token de autenticação', async () => {

        const res1 = await testServer
            .delete(`/cities/${cityId}`)

        expect(res1.status).toEqual(StatusCodes.UNAUTHORIZED)
    })

    it('Tentar deletar registro com id em um formato inválido (string)', async () => {
        const res1 = await testServer
            .delete('/cities/a')
            .set('Authorization', `Bearer ${acessToken}`)

        expect(res1.status).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('message.params.id')
    })

    it('Tentar deletar um registro que não existe', async () => {

        const res1 = await testServer
            .delete('/cities/99999')
            .set('Authorization', `Bearer ${acessToken}`)

        expect(res1.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors.default')

    })



})