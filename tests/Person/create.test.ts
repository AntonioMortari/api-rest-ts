import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"
import { authenticateUser, createCity, createPerson, createUser } from "../utils/createTestData"
import { IUser } from "../../src/server/database/models/User"


describe('Person - Create', () => {

    let userData: Omit<IUser, 'id'>
    let acessToken: string
    let cityId: number
    let personId: number

    beforeAll(async () => {
        userData = await createUser()
        acessToken = await authenticateUser(userData.email, userData.password)
        cityId = await createCity(acessToken)
        personId = await createPerson(acessToken)
    })

    it('Criar um registro', async () => {

        const res1 = await testServer.post('/person').send({
            fullName: 'Teste',
            email: 'teste201@jest.com',
            city_id: cityId
        }).set('Authorization', `Bearer ${acessToken}`)

        expect(res1.status).toEqual(StatusCodes.CREATED)
        expect(typeof res1.body).toEqual('number')

    })

    it('Tentar criar um registro sem token de autenticação', async () => {

        const res1 = await testServer.post('/person').send({
            fullName: 'Teste',
            email: 'teste201@jest.com',
            city_id: cityId
        })

        expect(res1.status).toEqual(StatusCodes.UNAUTHORIZED)

    })

    it('Tentar criar um registro com email inválido', async () => {
        const res1 = await testServer.post('/person').send({
            fullName: 'Teste',
            email: 'testandmetodocreate@',
            city_id: cityId
        }).set('Authorization', `Bearer ${acessToken}`)

        expect(res1.status).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('message.body.email')
    })

    it('Tentar criar um registro com id de cidade inexistente', async () => {
        const res1 = await testServer.post('/person').send({
            fullName: 'Teste',
            email: 'teste2023@jest.com',
            city_id: 999
        }).set('Authorization', `Bearer ${acessToken}`)

        expect(res1.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors.default')
    })

    it('Tentar criar um registro com email já cadastrado', async () => {
        const res1 = await testServer.post('/person').send({
            fullName: 'Teste',
            email: 'teste@jest.com',
            city_id: cityId
        }).set('Authorization', `Bearer ${acessToken}`)

        expect(res1.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors.default')
    })

})