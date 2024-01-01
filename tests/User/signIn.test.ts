import { IUser } from './../../src/server/database/models/User'
import { createUser } from '../utils/createTestData'
import { testServer } from '../jest.setup'
import { StatusCodes } from 'http-status-codes'


describe('User - SignIn (Login)', () => {

    let userData: Omit<IUser, 'id'>

    beforeAll(async () => {
        userData = await createUser()
    })

    it('Fazer login', async () => {

        const res1 = await testServer.post('/signIn').send({
            email: userData.email,
            password: userData.password
        })

        expect(res1.status).toEqual(StatusCodes.OK)
        expect(res1.body).toHaveProperty('acessToken')

    })

    it('Tentar fazer login com email incorreto', async () => {

        const res1 = await testServer.post('/signIn').send({
            email: 'wrongEmail@test.com',
            password: userData.password
        })

        expect(res1.status).toEqual(StatusCodes.UNAUTHORIZED)
        expect(res1.body).toHaveProperty('errors.default')

    })

    it('Tentar fazer login com senha incorreta', async () => {

        const res1 = await testServer.post('/signIn').send({
            email: userData.email,
            password:'wrongPassword123'
        })

        expect(res1.status).toEqual(StatusCodes.UNAUTHORIZED)
        expect(res1.body).toHaveProperty('errors.default')

    })

    it('Tentar fazer login passando dados errados', async () => {

        const res1 = await testServer.post('/signIn').send({
            email: 'email@ .com',
            password:'1'
        })

        expect(res1.status).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('message.body.email')
        expect(res1.body).toHaveProperty('message.body.password')

    })

    it('Tentar fazer login não informando email e senha', async () => {

        const res1 = await testServer.post('/signIn').send({
            email: '',
            password:''
        })

        expect(res1.status).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('message.body.email')
        expect(res1.body).toHaveProperty('message.body.password')

    })

})