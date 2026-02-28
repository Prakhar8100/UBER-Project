import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserSignup = () => {
  const [email, setEmail] = useState("")
  const [passsword, setPassword] = useState("")
  const [firstName, setfirstName] = useState("")
  const [lastName, setlastName] = useState("")
  const [userData, setUserData] = useState({})

  const submitHandler = (e) => {
    e.preventDefault()
      setUserData({
        username:{
          firstName:firstName,
          lastName:lastName
        },
        email: email,
        password: passsword
      })
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
                    <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>


                </form>
                <p className='text-center'>Already have an account? <Link to="/login" className='text-blue-600'>Login Here</Link></p>
            </div>
            <div>
                <p className='text-[6px] leading-tight'>By Proceeding, you consent to get calls, Whatsapp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.</p>
            </div>
        </div>
  )
}

export default UserSignup