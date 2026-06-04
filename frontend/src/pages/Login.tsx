import { useState } from 'react';
import api from '../api/axios'
import { redirect } from 'react-router-dom';
const Login = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const handlelogin=async (e:React.FormEvent) => {
    e.preventDefault();
    try {
      const response=await api.post("/auth/login",{
        name,email,password
      })
      console.log(response.data.token)
      localStorage.setItem("token",response.data.token)
      console.log(response.data)
      redirect("/home")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center
    bg-gradient-to-br
    from-blue-100 via-white to-indigo-100
    p-6
    '>
      <div className='
      w-full max-w-6xl bg-white rounded-3xl shadow-2xl
      overflow-hidden grid grid-cols-1
      lg:grid-cols-2
      '>
        {/* left */}
        <div
        className='hidden lg:block relative'
        >
          <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"
          className='h-full w-full object-cover'
          />
          <div
          className='absolute inset-0 bg-black/40'
          />
          <div
          className='absolute bottom-10 left-10 text-white'
          >
            <h1 className='text-5xl font-bold leading-tight'>Welcome Back</h1>
            <p className='mt-4 text-lg text-gray-200'>
              Book flight across the world with ease.
            </p>
          </div>
        </div>
        {/* right */}
        <div className='
        p-10 flex flex-col justify-center
        '>
          <div className='mb-10'>
            <h2
            className='text-4xl font-bold tracking-tight
            text-gray-800
            '
            >Login</h2>
            <p className='text-gray-500 mt-3'>Enter your 
              credentials to continue
            </p>
          </div>
          <form onSubmit={handlelogin} className="space-y-5">
            <input onChange={(e)=>setname(e.target.value)} type="text" placeholder='Enter Name'
            className='w-full border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500 transition'
            />
            <input onChange={(e)=>setemail(e.target.value)} type="email" placeholder='Enter Email' 
            className='w-full border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500 transition'
            />
            <input onChange={(e)=>setpassword(e.target.value)} type="password" placeholder='Enter Password'
            className='w-full border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500 transition'
            />
            <button className='w-full
            bg-blue-600 hover:bg-blue-700
            text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl
            '>Login</button>
          </form>
          <p className='text-gray-500 mt-6 text-center'>
            Don't have an account?
            <span className='text-blue-600 font-semibold cursor-pointer ml-1'>Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
    // <div className="min-h-screen flex items-center justify-center">
    //   <div className="text-center">
    //     <h1 className="mb-4 text-xl font-semibold">Login</h1>
    //     <form onSubmit={handlelogin} className="w-80 flex flex-col gap-3">
    //       <input
    //         className="text-center gap-2 border border-gray-200 p-0.5 rounded-xl"
    //         placeholder="Enter Name"
    //         type="text"
    //         value={name}
    //         onChange={(e)=>setname(e.target.value)}
    //         />
    //       <input
    //         className="text-center gap-2 border border-gray-200 p-0.5 rounded-xl"
    //         placeholder="Enter Email"
    //         value={email}
    //         onChange={(e)=>setemail(e.target.value)}
    //         type="email" />
    //       <input
    //         className="text-center gap-2 border border-gray-200 p-0.5 rounded-xl"
    //         placeholder="Enter your Password"
    //         value={password}
    //         onChange={(e)=>setpassword(e.target.value)}
    //         type="password" />
    //         <button type='submit'>Submit</button>
    //     </form>
    //   </div>
    // </div>