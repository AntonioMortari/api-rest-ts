import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"
import { createCity, createPerson } from "../utils/createTestData"


describe('Person - Create', () => {

    let cityId: number
    let personId: number

    beforeAll(async () => {
        try {
            cityId = await createCity()
            personId = await createPerson()
        } catch (error) {

            console.error('Erro ao criar uma cidade:', error)
        }
    })

    it('Criar um registro', async () => {

        const res1 = await testServer.post('/person').send({
            fullName: 'Teste',
            email: 'teste201@jest.com',
            city_id: cityId
        })

        expect(res1.status).toEqual(StatusCodes.CREATED)
        expect(typeof res1.body).toEqual('number')

    })

    it('Tentar criar um registro com email inválido', async () => {
        const res1 = await testServer.post('/person').send({
            fullName: 'Teste',
            email: 'testandmetodocreate@',
            city_id: cityId
        })

        expect(res1.status).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('message.body.email')
    })

    it('Tentar criar um registro com id de cidade inexistente', async () => {
        const res1 = await testServer.post('/person').send({
            fullName: 'Teste',
            email: 'teste2023@jest.com',
            city_id: 999
        })

        expect(res1.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors.default')
    })

    it('Tentar criar um registro com email já cadastrado', async () => {
        const res1 = await testServer.post('/person').send({
            fullName: 'Teste',
            email: 'teste@jest.com',
            city_id: cityId
        })

        expect(res1.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors.default')
    })

})