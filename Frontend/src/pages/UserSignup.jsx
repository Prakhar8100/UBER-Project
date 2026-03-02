import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/userContext'

const UserSignup = () => {
  const [email, setEmail] = useState("")
  const [passsword, setPassword] = useState("")
  const [firstName, setfirstName] = useState("")
  const [lastName, setlastName] = useState("")
  const [userData, setUserData] = useState({})

  const navigate = useNavigate()

  const {user, setUser} = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
      const newUser = {
        fullname:{
          firstname:firstName,
          lastname:lastName
        },
        email: email,
        password: passsword
      }

      const responce = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

      if(responce.status === 201){
        const data = responce.data


        setUser(data.user)
        localStorage.setItem('token', data.token)

        navigate("/home")
      }

      setEmail("")
      setPassword("")
      setfirstName("")
      setlastName("")
  }

  return (
     <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-25 mb-5' src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png" alt="" />
                <form onSubmit={(e) => submitHandler(e)}>

                  <h3 className='text-lg w-1/2 font-medium mb-2 '>What's Your Name</h3>
                  <div className='flex gap-4 mb-6'>
                     <input
                        required
                       
                        className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
                        type="text"
                        placeholder='First Name'
                        value={firstName}
                        onChange={(e) => setfirstName(e.target.value)}
                        />
                      
                       <input
                        required
                       
                        className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
                        type="text"
                        placeholder='Last Name' 
                        value={lastName}
                        onChange={(e) => setlastName(e.target.value)}
                        />
                  </div>

                    <h3 className='text-lg font-medium mb-2'>What's your email?</h3>

                    <input
                        required
                       
                        className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        type="email"
                        placeholder='email@example.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />

                    <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

                    <input
                        required
                       
                        className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        type="password"
                        placeholder='Enter Your Password'
                        value={passsword}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Create Account</button>


                </form>
                <p className='text-center'>Already have an account? <Link to="/login" className='text-blue-600'>Login Here</Link></p>
            </div>
            <div>
                <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
            </div>
        </div>
  )
}

export default UserSignup