"use client"
import { logIn } from "@/reducers/global/global.states"
import { createUser, userAuth } from "@/services/auth-services"
import { setToken } from "@/services/user-service"
import { useAppSelector } from "@/store/store"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { FaFacebook, FaGoogle } from "react-icons/fa"
import { RiLoader4Fill } from "react-icons/ri"
import { useDispatch } from "react-redux"
interface formSchema{
    email:string,
    password:string,
    name:string
}
export default function Register(){
    const dispatch = useDispatch()
    const router = useRouter()
    const isAuth = useAppSelector((state)=>state.authReducer.authentication.isLoggedIn)
    const RenderForm = () => {
        const initialFormState: formSchema = {
            email: "",
            password: "",
            name: ""
        }
        const [input,setInput] = useState<formSchema>(initialFormState)
        const [loading,setLoading] = useState(false)
        const [isPassword,setIsPassword] = useState(true)
        const handleChange = (e: FormEvent<HTMLInputElement>) =>{
            const {name,value} = e.currentTarget;
            setInput((prev)=>({
                ...prev,
                [name]:value
            }))
        }
    
        const handleSubmit = async(e:FormEvent<HTMLFormElement>) =>{
            e.preventDefault();
            setLoading(true)
            const data = await createUser(input)
            if(data?.status){
                toast.success("Account Created",{
                    position: 'top-right',
                    duration: 5000 
                })
                setLoading(false)
                router.push('/')
            }else{
                setLoading(false)
            }
        }
        return (
            <form className='flex flex-col items-center justify-center w-full' onSubmit={handleSubmit}>
                <span className='flex flex-col w-full mb-5'>
                    <label htmlFor='name' className='uppercase font-montserrat'>
                        name
                    </label>
                    <input id='name' name='name' placeholder='enter your name' value={input.name} onChange={handleChange} className='w-full outline outline-[1px] outline-gray-900 py-3 px-2 rounded-md mt-1 bg-transparent ' />
                </span>
                <span className='flex flex-col w-full mb-5'>
                    <label htmlFor='email' className='uppercase font-montserrat'>
                        email
                    </label>
                    <input id='email' name='email' placeholder='enter your email' value={input.email} onChange={handleChange} className='w-full outline outline-[1px] outline-gray-900 py-3 px-2 rounded-md mt-1 bg-transparent ' />
                </span>
                <span className='flex flex-col w-full'>
                    <label htmlFor='password' className='uppercase font-montserrat'>
                        password
                    </label>
                    <input id='password' name='password' placeholder='enter your password' type='password' value={input.password} onChange={handleChange} className='w-full outline outline-[1px] outline-gray-900 py-3 px-2 rounded-md mt-1 bg-transparent' />
                </span>
            
                <button className='py-3 w-full px-3 outline outline-1 flex mt-4 items-center bg-white text-black justify-center rounded-md outline-gray-800 my-2 font-semibold font-sans' disabled={loading} onClick={(e)=>handleSubmit}>
                    {!loading?<span>SignUp</span>:<span className='animate-spin'><RiLoader4Fill size={30}/> </span>}
                </button>
                <p className='font-extralight'>
                    Already Registered till now <Link href="/auth" className='underline font-semibold uppercase px-2'>
                        click Here!
                    </Link>
                </p>
            </form>
        )
    }

    useEffect(()=>{
        if(isAuth){
            router.back()
        }
    },[isAuth])

    return (
        <div className="bg-black h-screen w-full flex items-center justify-center">
            <div className="flex flex-col items-center">
                <h1 className="text-6xl font-vina  mb-2 drop-shadow-xl text-white">
                    Welcome to Pelican
                </h1>
                <p className="font-montserrat tracking-wider ">a new mode for your communication</p>
                <p className="my-2 text-xl font-bold font-montserrat tracking-wider">Register with</p>
                <span className="flex flex-col items-center justify-center gap-3 w-full  my-3">
                    <button className="py-3 w-full px-3 outline outline-1 flex items-center bg-white text-black justify-center rounded-md outline-gray-800">
                        <FaGoogle size={30} />
                    </button>
                    <button className="py-3 w-full px-3 outline outline-1 flex items-center bg-white text-black justify-center rounded-md outline-gray-800">
                        <FaFacebook size={30} />
                    </button>
                </span>
                <div className='flex items-center justify-center gap-2 m-2 w-full'>
                    <hr className='w-1/3 h-[1px] bg-white' />
                    <p className='text-white uppercase font-semibold'>or</p>
                    <hr className='w-1/3 h-[1px] bg-white' />
                </div>
                <div className='flex flex-col items-center justify-center w-full'>
                    <RenderForm/>
                </div>
            </div>
        </div>
    )
}