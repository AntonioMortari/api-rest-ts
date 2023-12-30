import { testServer } from "../jest.setup"


const createCity = async(): Promise<number> => {
    
    const res = await testServer.post('/cities').send({
        name:'Campinas'
    })

    return res.body

}

const createPerson = async(): Promise<number> => {
    
    const res = await testServer.post('/person').send({
        fullName: 'Teste',
        email:'teste@jest.com',
        city_id: await createCity() 
    })

    return res.body

}

export {createCity, createPerson }