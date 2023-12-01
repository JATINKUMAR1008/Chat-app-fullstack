import { Inter } from 'next/font/google'
import { decodeToken, useJwt } from 'react-jwt'

interface DecodeToken{
    exp: number,
    iat: number,
    user: {}
}

export const getUserData = async(token: string | null) => {
    if (token) {
        const decodeData = await <DecodeToken>decodeToken(token)
        console.log(decodeData)
        return decodeData.user
    } else {
        return null
    }
}

export const getToken = () => {
    return localStorage.getItem('token')
} 
export const setToken = (token:string) =>{
    return localStorage.setItem('token',token)
}

export const getUsers = () =>{
    return fetch(`${process.env.NEXT_PUBLIC_API}/user`,{
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }).then((res) => { return res.json() }).then((data) => { return data })
}