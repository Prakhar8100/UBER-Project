import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainSignup = () => {

   const [email, setEmail] = useState("")
    const [passsword, setPassword] = useState("")
    const [firstName, setfirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [userData, setUserData] = useState({})
  
    const submitHandler = (e) => {
      e.preventDefault()
        setUserData({
          fullName:{
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
      <div className='py-5 px-5 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-25 mb-5' src="https://media.designrush.com/inspiration_images/651560/conversions/1200x600wa-mobile.jpg" alt="" />
                <form onSubmit={(e) => submitHandler(e)}>

                  <h3 className='text-lg w-full font-medium mb-2 '>What's Our Captain's Name</h3>
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

                    <h3 className='text-lg font-medium mb-2'>What's Our Captain's email?</h3>

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
                <p className='text-center'>Already have an account? <Link to="/captain-login" className='text-blue-600'>Login Here</Link></p>
            </div>
            <div>
                <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
            </div>
        </div>
  )
}

export default CaptainSignup