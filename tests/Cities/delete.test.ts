import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Cities - Delete', () => {

    it('Deletar um registro', async() => {

        const res1 = await testServer.delete('/cities/1')

        expect(res1.status).toEqual(StatusCodes.OK)
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