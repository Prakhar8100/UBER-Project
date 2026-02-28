import React from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {
    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
           <div>
              <img className='w-25 mb-5' src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png" alt="" />
            <form>
                <h3 className='text-lg font-medium mb-2'>What's your email?</h3>

                <input 
                required 
                className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' 
                type="email"
                placeholder='email@example.com' />

                <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
            
                <input 
                required 
                className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' 
                type="password" 
                placeholder='Enter Your Password' />
                <button className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
              
        
            </form>
             <p className='text-center'>New Here? <Link to="/signup" className='text-blue-600'>Create A New Account</Link></p>
           </div>
           <div>
            <button className='bg-[#10b461] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as Captain</button>
           </div>
        </div>
    )
}

export default UserLogin