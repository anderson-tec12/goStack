
type createUSerType = {
    name?:string,
    email:string,
    password:string
}

export default function createUser({email,name = "",password}:createUSerType){
    const user:createUSerType={
        name,email,password
    }

    return user
}