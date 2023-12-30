import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"
import { createPerson } from "../utils/createTestData"


describe('Person - Delete', () => {

    let personId: number

    beforeAll(async () => {
        try {
            personId = await createPerson()
        } catch (error) {

            console.error('Erro ao criar uma pessoa:', error)
        }
    })

    it('Deletar um registro', async () => {
        const res1 = await testServer.delete(`/person/${personId}`)

        expect(res1.status).toEqual(StatusCodes.NO_CONTENT)
    })

    it('Tentar deletar um registro passando um param em um formato inválido (string)', async () => {
        const res1 = await testServer.delete(`/person/a`)

        expect(res1.status).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('message.params.id')
    })

    it('Tentar deletar um registro que não existe', async () => {
        const res1 = await testServer.delete('/person/9999')

        expect(res1.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors.default')
    })

})