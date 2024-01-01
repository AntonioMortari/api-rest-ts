import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"
import { authenticateUser, createPerson, createUser } from "../utils/createTestData"
import { IUser } from "../../src/server/database/models/User"


describe('Person - Delete', () => {

    let userData: Omit<IUser, 'id'>
    let acessToken: string
    let personId: number

    beforeAll(async () => {
        userData = await createUser()
        acessToken = await authenticateUser(userData.email, userData.password)
        personId = await createPerson(acessToken)
    })

    it('Deletar um registro', async () => {
        const res1 = await testServer
            .delete(`/person/${personId}`)
            .set('Authorization', `Bearer ${acessToken}`)

        expect(res1.status).toEqual(StatusCodes.NO_CONTENT)
    })

    it('Tentar deletar um registro sem token de autenticação', async () => {
        const res1 = await testServer
            .delete(`/person/${personId}`)

        expect(res1.status).toEqual(StatusCodes.UNAUTHORIZED)
    })

    it('Tentar deletar um registro passando um param em um formato inválido (string)', async () => {
        const res1 = await testServer
            .delete(`/person/a`)
            .set('Authorization', `Bearer ${acessToken}`)

        expect(res1.status).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('message.params.id')
    })

    it('Tentar deletar um registro que não existe', async () => {
        const res1 = await testServer
            .delete('/person/9999')
            .set('Authorization', `Bearer ${acessToken}`)

        expect(res1.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors.default')
    })

})