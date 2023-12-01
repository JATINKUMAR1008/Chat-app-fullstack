"use client"
import { logIn, logOut } from '@/reducers/global/global.states'
import { authToken } from '@/services/auth-services'
import { useAppSelector } from '@/store/store'
import { Just_Me_Again_Down_Here } from 'next/font/google'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { decodeToken, useJwt } from 'react-jwt'
import useSocket from '@/hooks/websocket-hook'

interface User {
  user: {
    name: string,
    email: string,
    verified: boolean,
    _v: number,
    _id: string
  }
}

export default function Home() {
  const isAuth = useAppSelector((state) => state.authReducer.authentication.isLoggedIn)
  const user = useAppSelector((state) => state.authReducer.authentication.user)
  const router = useRouter()
  const dispatch = useDispatch()
  const getData = async (token: string) => {
    const decodedToken = await decodeToken<User>(token)
    if (decodedToken) {
      console.log(decodedToken)
      dispatch(logIn({
        isLoggedIn: true,
        user: decodedToken.user
      }))
      router.push('/chat')
    }
  }
  useEffect(() => {
    if (!isAuth && !localStorage.getItem('token')) {
      router.push('/auth')
    }
    else {
      const token = localStorage.getItem('token')
      if (token) {
        getData(token)
      }
    }
  }, [isAuth])

  const logOut_page = () => {
    localStorage.removeItem('token')
    dispatch(logOut())
  }
  return (
    <>
      main Page 1
      {user ? <p>{user?.name}</p> : <p></p>}
      <button onClick={() => logOut_page()}>
        Logout
      </button>
    </>
  )
}
