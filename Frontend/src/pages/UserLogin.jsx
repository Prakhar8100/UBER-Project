import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/userContext'
import axios from 'axios'



const UserLogin = () => {
    const [email, setEmail] = useState('')
    const [passsword, setPassword] = useState('')
    const [userData, setUserData] = useState({})

    const { user, setUser } = useContext(UserDataContext)

    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        const userData = {
            email: email,
            password: passsword
        }


        const responce = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

        if (responce.status === 200) {
            const data = responce.data
            setUser(data)
            localStorage.setItem('token', data.token)
            navigate('/home')
        }
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-25 mb-5' src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png" alt="" />
                <form onSubmit={(e) => submitHandler(e)}>
                    <h3 className='text-lg font-medium mb-2'>What's your email?</h3>

                    <input
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        type="email"
                        placeholder='email@example.com' />

                    <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

                    <input
                        required
                        value={passsword}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        type="password"
                        placeholder='Enter Your Password' />
                    <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>


                </form>
                <p className='text-center'>New Here? <Link to="/signup" className='text-blue-600'>Create A New Account</Link></p>
            </div>
            <div>
                <Link to='/Captain-Login' className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as Captain</Link>
            </div>
        </div>
    )
}

export default UserLogin