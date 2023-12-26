import { StatusCodes } from 'http-status-codes'
import { testServer } from './../jest.setup'



describe('Cities - GetOne', () => {

    it('Buscar um registro', async() => {

        const res1 = await testServer.get('/cities/1')

        expect(res1.status).toEqual(StatusCodes.OK)

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