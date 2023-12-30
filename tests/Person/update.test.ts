import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'
import { createCity, createPerson } from '../utils/createTestData'

describe('Person - Update', () => {

    let personId: number
    let cityId: number

    beforeAll(async () => {
        try {
            cityId = await createCity()
            personId = await createPerson()
        } catch (error) {
            console.error('Erro ao criar os registros:', error)
        }
    })

    it('Atualizar um registro', async () => {

        const res1 = await testServer.put(`/person/${personId}`).send({
            email: 'emailatualizado@teste.com'
        })

        expect(res1.status).toEqual(StatusCodes.NO_CONTENT)
    })

    it('Tentar atualizar um registro que não existe', async () => {
        const res1 = await testServer.put('/person/9999')

        expect(res1.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors.default')
    })

    it('Tentar atualizar um registro passando um param em um formato inválido (string)', async () => {
        const res1 = await testServer.put(`/person/a`)

        expect(res1.status).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('message.params.id')
    })

    it('Tentar atualizar um registro com email inválido', async () => {
        const res1 = await testServer.put(`/person/${personId}`).send({
            email: 'testandmetodoupdate@',
        })

        expect(res1.status).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('message.body.email')
    })

    it('Tentar atualizar um registro com id de cidade inexistente', async () => {
        const res1 = await testServer.put(`/person/${personId}`).send({
            city_id: 999
        })

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