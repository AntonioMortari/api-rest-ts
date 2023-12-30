import { createPerson } from '../utils/createTestData'
import { testServer } from './../jest.setup'
import { StatusCodes } from 'http-status-codes'

describe('Person - GetOne', () => {

    let personId: number

    beforeAll(async () => {
        try {
            personId = await createPerson()
        } catch (error) {

            console.error('Erro ao criar uma pessoa:', error)
        }
    })

    it('Buscar por um registro', async () => {

        const res1 = await testServer.get(`/person/${personId}`)

        expect(res1.status).toEqual(StatusCodes.OK)
    })

    it('Tenta buscar por um registro passando um param em um formato inválido (string)', async () => {

        const res1 = await testServer.get(`/person/a`)

        expect(res1.status).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('message.params.id')
    })

    it('Tenta buscar por um registro que não existe', async () => {

        const res1 = await testServer.get('/person/9999')

        expect(res1.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors.default')
    })

})