import {Request,Response} from 'express'

import createUser from './services/CreateUser'

export function helloWorld(request:Request,response:Response){
    const user = createUser({email:'anderson@gmail.com',name:'Anderson B. Silva',password:'123'})

    return response.json(user)
}
