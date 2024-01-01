import { StatusCodes } from 'http-status-codes'
import { testServer } from './../jest.setup'

import { createCity, createUser, authenticateUser } from '../utils/createTestData'
import { IUser } from '../../src/server/database/models/User'

describe('Cities - GetOne', () => {

    let userData: Omit<IUser, 'id'>
    let acessToken: string
    let cityId: number

    beforeAll(async () => {
        userData = await createUser()
        acessToken = await authenticateUser(userData.email, userData.password)
        cityId = await createCity(acessToken)
    })

    it('Buscar um registro', async () => {

        const res1 = await testServer
            .get(`/cities/${cityId}`)
            .set('Authorization', `Bearer ${acessToken}`)

        expect(res1.status).toEqual(StatusCodes.OK)
    })

    it('Tenta buscar um registro sem token de autenticação', async () => {

        const res1 = await testServer
            .get(`/cities/${cityId}`)

        expect(res1.status).toEqual(StatusCodes.UNAUTHORIZED)
    })

    it('Buscar um registro passando um id no formato inválido (string)', async () => {
        const res1 = await testServer
            .get('/cities/a')
            .set('Authorization', `Bearer ${acessToken}`)


        expect(res1.status).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('message.params.id')

    })

    it('Tentar buscar um registro que não existe', async () => {

        const res1 = await testServer
            .get('/cities/99999')
            .set('Authorization', `Bearer ${acessToken}`)

        expect(res1.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors.default')

    })




})