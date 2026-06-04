import React from 'react'
import { useNavigate } from 'react-router-dom'
import skyback from "../assets/sky-back.avif"

const HeroSearch = () => {
    const navigate=useNavigate()
  return (
      <div className={`
      h-screen
      bg-[linear-gradient(to_right,rgba(29,78,216,0.82),rgba(49,46,129,0.88)),url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop')]
      text-white flex
      items-center justify-center px-6
      `}>
        <div className="max-w-5xl w-full">
        <h1
        className="text-6xl font-bold leading-tight"
        >Book Flights <br /> Across The World </h1>
        <p
        className="mt-6 text-xl text-gray-200 max-w-2xl"
        >
            Fast, secure and seamless airline
            booking experience with real-time
            seat selection and instant checkout.
        </p>
        <button
        onClick={()=>navigate("/search")}
        className="mt-10 bg-white px-4 py-2 text-blue-700 rounded-2xl hover:-translate-y-1 transition"
        >
          Search Flights
        </button>
        </div>
      </div>
  )
}

export default HeroSearch