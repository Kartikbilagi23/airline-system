import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

const Navbar = () => {
  const navigate=useNavigate();
  const [query, setquery] = useState("");

  const handleSearch=()=>{
    if(!query.trim()){
      return;
    }
    navigate(`/search?query=${encodeURIComponent(query)}`);
  }
  return (
    <nav
    className='h-16 bg-white shadow-md px-8 flex items-center justify-between'    
    >
      {/* left */}
      <div className='flex items-center gap-6'>
        <h1
        className='text-2xl font-bold text-blue-700'
        >Skyvira</h1>
        <input
        value={query}
        onChange={(e)=>setquery(e.target.value)}
        onKeyDown={(e)=>e.key==="Enter"&&handleSearch()}
        className='w-[40vw] border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500'
        placeholder='Search Flights'
        type="text" />
      </div>
      {/* right */}
      <div className='flex items-center gap-6'>
        <button onClick={()=>navigate("/mybookings")} className='hover:text-blue-600 transition'>My Bookings</button>
        <button
        onClick={()=>navigate("/login")}
         className='bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition'>Login</button>
      </div>
    </nav>
  )
}

export default Navbar