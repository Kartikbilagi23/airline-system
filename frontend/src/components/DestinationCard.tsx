import React, { useRef } from 'react'
import { destinations } from "../store/destination"
import { ChevronLeft, ChevronRight } from "lucide-react";
const DestinationCard = () => {
    const scrollref=useRef<HTMLDivElement>(null);

    const scrollleft=()=>{
        scrollref.current?.scrollBy({
            left:-300,
            behavior:"smooth"
        })
    }
    const scrollright=()=>{
        scrollref.current?.scrollBy({
            left:300,
            behavior:"smooth"
        })
    }

    return (
        <div className='p-[72px] relative'>
                <h2
                    className='text-4xl font-bold mb-8'
                >Popular Destination</h2>
                    <button onClick={scrollleft}
                    className='absolute left-6 top-1/2
                    -translate-y-1/2 z-10 bg-white shadow-lg
                    rounded-full p-3 hover:scale-110 transition
                    '
                    >
                    <ChevronLeft size={28}/>
                    </button>
                    <button
                    onClick={scrollright}
                    className='absolute right-6 top-1/2
                -translate-y-1/2 z-10
                bg-white shadow-lg
                rounded-full p-3
                hover:scale-110 transition'
                    ><ChevronRight size={28}/></button>
                <div
                    ref={scrollref}
                 className='flex gap-6 overflow-x-auto pb-4 scroll-smooth scrollbar-hide'>
                    {destinations.map((item) => (
                        <div
                            key={item.id}
                            className='min-w-[260px]
                    h-[360px] rounded-[50%] overflow-hidden relative group
                    cursor-pointer shadow-xl
                    '
                        >
                            <img
                                className='w-full h-full object-cover group-hover:scale-110
                        transition duration-500
                        '
                                src={item.image} alt="" />
                            <div className='absolute inset-0 bg-gradient-to-t from-black/80
                        to-transparent
                        '/>
                            <div className='absolute bottom-6 left-6 text-white'>
                                <h3 className='text-3xl font-bold relative bottom-5 left-[30px]'>{item.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
        </div>
    )
}

export default DestinationCard