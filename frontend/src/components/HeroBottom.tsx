import React from 'react'
import herobg from "../assets/herobg.avif"

const HeroBottom = () => {
  return (
    <div className='p-[80px] bg-gradient-to-br from-blue-50 via-white to-indigo-300'>
    <div className='
    relative rounded-[32px] overflow-hidden h-[800px]
    '>
      <img src={herobg} className='w-full h-full absolute inset-0 object-cover' />
       <div className='absolute inset-0 bg-black/40'></div>
       <div className='relative z-10 max-w-7xl mx-auto px-8 pt-24'>
         <button
        className='
        ml-auto flex items-center text-white
        gap-2  bg-white/20 backdrop-blur-md
        text-white px-6 py-3 rounded-2xl border border-white/20
        hover:bg-white/30 transition
        '
        >
          VIEW ALL →
        </button>
        <div className='mt-24 grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div>
          <div className='bg-white/10 backdrop-blur-xl border border-white/20
          rounded-3xl p-8 text-white shadow-2xl hover:scale-105
          transition duration-300
          '>
            <h2
            className='text-4xl font-bold leading-tight'
            >Pre book Fast forward at up to 70% discount</h2>
            <p className='mt-8 text-lg text-gray-200'>Priority check-in and anytime boarding.</p>
            <div className='mt-10 flex justify-end'>
              <button className='
              w-16 h-16 rounded-full bg-black text-3xl
              '>↗</button>
            </div>
          </div>
          </div>
          <div>
          <div className='bg-white/10 backdrop-blur-xl border border-white/20
          rounded-3xl p-8 text-white shadow-2xl hover:scale-105
          transition duration-300
          '>
            <h2
            className='text-4xl font-bold leading-tight'
            >Baggage add-on from ₹1515</h2>
            <p className='mt-8 text-lg text-gray-200'>Excess baggage and additional piece</p>
            <div className='mt-10 flex justify-end'>
              <button className='
              w-16 h-16 rounded-full bg-black text-3xl
              '>↗</button>
            </div>
          </div>
          </div>
          <div>
          <div className='bg-white/10 backdrop-blur-xl border border-white/20
          rounded-3xl p-8 text-white shadow-2xl hover:scale-105
          transition duration-300
          '>
            <h2
            className='text-4xl font-bold leading-tight'
            >Emergency XL seats starting at INR 500</h2>
            <p className='mt-8 text-lg text-gray-200'>Window,aisle or seat with extra legroom</p>
            <div className='mt-10 flex justify-end'>
              <button className='
              w-16 h-16 rounded-full bg-black text-3xl
              '>↗</button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    </div>

  )
}

export default HeroBottom
