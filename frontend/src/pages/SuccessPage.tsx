import React from 'react'
import { useLocation } from 'react-router-dom';


const SuccessPage = () => {
    const location=useLocation();
    const {
        flight,
        selectedSeats,
        booking
    }=location.state;

  return (
    <div className='min-h-screen bg-gray-100 p-8'>
        <div className='max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8'>
            <h1 className='text-4xl font-bold text-green-600 mb-6'>Booking confirmed</h1>
            <div className='space-y-3'>
                <p>Flight:
                    <span>{" "}{flight.flightNumber}</span>
                </p>
                <p>
                    <span>
                        Route:
                    </span>
                    {" "}{flight.source}{" "}{flight.destination}
                </p>
                <p>
                    <span>BookingId:</span>
                    {" "}{booking.id}
                </p>
                <p><span>
                    Payment:
                    </span>
                    {" "}Success
                    </p>
                <p><span></span></p>
            </div>
        </div>
    </div>
  )
}


export default SuccessPage