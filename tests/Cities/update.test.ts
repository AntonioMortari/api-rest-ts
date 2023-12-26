import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'


describe('Cities - Update', () => {

    it('Atualizar registro', async () => {

        const res1 = await testServer
            .put('/cities/1')
            .send({
                name: 'Campinas'
            })

        expect(res1.status).toEqual(StatusCodes.OK)
        expect(res1.body).toHaveProperty('message')

    })

    it('Tentar atualizar registro com id em um formato inválido (string)', async () => {
        const res1 = await testServer
            .put('/cities/a')
            .send({
                name: 'Campinas'
            })

        expect(res1.status).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('message.params.id')

    })

    it('Tentar atualizar registro sem passar dados no body', async () => {

        const res1 = await testServer
            .put('/cities/1')
            .send({})

        expect(res1.status).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('message.body.name')


    })

    it('Tentar atualizar registro passando um name com menos de 3 caracteres', async () => {

        const res1 = await testServer
            .put('/cities/1')
            .send({
                name: 'Ca'
            })

        expect(res1.status).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('message.body.name')

    })

    it('Tentar atualizar um registro que não existe', async () => {

        const res1 = await testServer
            .put('/cities/99999')
            .send({name: 'Campinas'})

        expect(res1.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors.default')

    })

})