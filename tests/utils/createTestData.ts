import { IUser } from "../../src/server/database/models/User"
import { testServer } from "../jest.setup"


const createCity = async(acessToken: string): Promise<number> => {
    
    const res = await testServer.post('/cities').send({
        name:'Campinas'
    }).set('Authorization', `Bearer ${acessToken}`)

    return res.body

}

const createPerson = async(acessToken: string): Promise<number> => {
    
    const res = await testServer.post('/person').send({
        fullName: 'Teste',
        email:'teste@jest.com',
        city_id: await createCity(acessToken) 
    }).set('Authorization', `Bearer ${acessToken}`)

    return res.body

}

const authenticateUser = async(email: string, password: string) => {

    const res = await testServer.post('/signIn').send({
        email: email,
        password: password
    })

    return res.body.acessToken

}

const createUser = async() => {

    const userData: Omit<IUser, 'id'> = {
        name: 'Teste',
        email:'teste@jest.com',
        password:'123admin'
    }

    await testServer.post('/signUp').send(userData)

    return userData

}

export {createCity, createPerson, createUser, authenticateUser }