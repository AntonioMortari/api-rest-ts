import { StatusCodes } from 'http-status-codes'
import { testServer } from './../jest.setup'

import { createCity } from '../utils/createTestData'

describe('Cities - GetOne', () => {

    let cityId: number

    beforeAll(async () => {
        try {
            cityId = await createCity()
        } catch (error) {

            console.error('Erro ao criar uma cidade:', error)
        }
    })

    it('Buscar um registro', async() => {

        const res2 = await testServer.get(`/cities/${cityId}`)

        expect(res2.status).toEqual(StatusCodes.OK)
    })

    it('Buscar um registro passando um id no formato inválido (string)', async() => {
        const res1 = await testServer.get('/cities/a')

        expect(res1.status).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('message.params.id')

    })

    it('Tentar deletar um registro que não existe', async() => {

        const res1 = await testServer.get('/cities/99999')

        expect(res1.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors.default')

    })




})