import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"
import { IUser } from "../../src/server/database/models/User"
import { createUser } from "../utils/createTestData"


describe('User - SignUp (Cadastro)', () => {

    let userData: Omit<IUser,'id'>

    beforeAll(async() => {
        userData = await createUser()
    })

    it('Criar usuário', async() => {

        const res1 = await testServer.post('/signUp').send({
            name:'Teste2',
            email:'teste2@teste2.com',
            password:'123admin'
        })

        expect(res1.status).toEqual(StatusCodes.CREATED)
        expect(typeof res1.body).toEqual('number')

    })

    it('Tentar criar usuário sem passar dados no body', async() => {

        const res1 = await testServer.post('/signUp').send({
            name:'',
            email:'',
            password:''
        })

        expect(res1.status).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('message.body.name')
        expect(res1.body).toHaveProperty('message.body.email')
        expect(res1.body).toHaveProperty('message.body.password')

    })

    it('Tentar criar usuário sem a quantidade mínima de caracteres', async() => {

        const res1 = await testServer.post('/signUp').send({
            name:'Te',
            email:'test',
            password:'12'
        })

        expect(res1.status).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('message.body.name')
        expect(res1.body).toHaveProperty('message.body.email')
        expect(res1.body).toHaveProperty('message.body.password')

    })

    // it('Tentar criar um usuário que já existe (com email já cadastrado)', async() => {
        
    //     const res1 = await testServer.post('/signUp').send({
    //         name:'Teste2',
    //         email:userData.email,
    //         password:'123admin'
    //     })

    //     expect(res1.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    //     expect(res1.body).toHaveProperty('errors.default')

    // })

})