import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

import { createCity} from '../utils/createTestData'

describe('Cities - Delete', () => {

    let cityId: number

    beforeAll(async () => {
        try {
            cityId = await createCity()
        } catch (error) {

            console.error('Erro ao criar uma cidade:', error)
        }
    })

    it('Deletar um registro', async() => {

        const res1 = await testServer
            .delete(`/cities/${cityId}`)

        expect(res1.status).toEqual(StatusCodes.NO_CONTENT)
    })

    it('Tentar deletar registro com id em um formato inválido (string)', async() => {
        const res1 = await testServer.delete('/cities/a')

        expect(res1.status).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('message.params.id')
    })

    it('Tentar deletar um registro que não existe', async() => {

        const res1 = await testServer.delete('/cities/99999')

        expect(res1.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors.default')

    })



})