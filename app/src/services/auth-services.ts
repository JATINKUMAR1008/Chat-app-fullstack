interface UserInput {
    email: string,
    password: string
}

interface UserRegisterInput {
    name: string,
    email: string,
    password: string
}

export const userGenerateAuthToken = async (payload: UserInput) => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        }
    }).then((res) => { return res.json() }).then((data) => { return data })
    localStorage.setItem('token', data.token);
    return data;
}

export const createUser = async(payload: UserRegisterInput) =>{
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/user`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        }
    }).then((res) => { return res.json() }).then((data) => { return data })
    localStorage.setItem('token', data.token);
    return data;
}


export const userAuth = async (payload: UserInput) => {
    const token = await userGenerateAuthToken(payload)
    console.log("data-token",token);
    const data = await authToken(token)
    return data;
    
}

export const authToken = async(token:string | null) =>{
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/auth`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        }
    }).then((res) => { return res.json() }).then((data) => { return data })
    return data;
}