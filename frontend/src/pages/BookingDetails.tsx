import React from 'react'
import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react'
import { jsPDF } from "jspdf"

const BookingDetails = () => {
  const [bookings, setbookings] = useState<any[]>([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("booking") || "[]");
    setbookings(data)
  }, [])


  const downloadTicket = (booking: any) => {

    const doc = new jsPDF()

    // BACKGROUND HEADER
    doc.setFillColor(37, 99, 235)
    doc.rect(0, 0, 210, 45, "F")

    // AIRLINE TITLE
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(28)
    doc.text("SkyVira Airlines", 20, 25)

    // SUBTITLE
    doc.setFontSize(14)
    doc.text("Boarding Pass", 20, 35)

    // RESET TEXT COLOR
    doc.setTextColor(0, 0, 0)

    // TICKET BOX
    doc.setDrawColor(220)
    doc.roundedRect(15, 55, 180, 120, 6, 6)

    // ROUTE SECTION
    doc.setFontSize(34)
    doc.setFont("helvetica", "bold")

    doc.text(
      booking.flight.source,
      25,
      85
    )

    doc.text(
      booking.flight.destination,
      140,
      85
    )

    // CENTER LINE
    doc.setLineWidth(1)
    doc.line(75, 80, 130, 80)

    // FLIGHT INFO
    doc.setFontSize(13)
    doc.setFont("helvetica", "normal")

    doc.text(
      `Flight Number`,
      25,
      105
    )

    doc.text(
      `${booking.flight.flightNumber}`,
      25,
      113
    )

    doc.text(
      `Seats`,
      90,
      105
    )

    doc.text(
      booking.seats.join(", "),
      90,
      113
    )

    doc.text(
      `Price`,
      145,
      105
    )

    doc.text(
      `Rs. ${booking.flight.price}`,
      145,
      113
    )

    // DIVIDER
    doc.setDrawColor(180)
    doc.line(25, 125, 180, 125)

    // PAYMENT
    doc.text(
      `Payment ID`,
      25,
      145
    )

    doc.text(
      booking.paymentId,
      25,
      153
    )

    // STATUS BADGE
    doc.setFillColor(34, 197, 94)
    doc.roundedRect(135, 138, 40, 15, 4, 4, "F")

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(12)
    doc.text(
      "CONFIRMED",
      142,
      148
    )

    // FOOTER
    doc.setTextColor(100)

    doc.setFontSize(11)

    doc.text(
      "Thank you for choosing SkyVira Airlines",
      45,
      190
    )

    doc.save(
      `ticket-${booking.paymentId}.pdf`
    )
  }



  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-50
    to-white
    '>
      <Navbar />
      <div className='max-w-6xl mx-auto px-6 py-16'>
        <div className='mb-12'>
          <h1 className='text-5xl font-bold tracking-tight'>My Bookings</h1>
          <p className='text-gray-500 mt-3 text-lg'>Manage your upcoming journeys</p>
        </div>
        {bookings.length === 0 && (
          <div className='bg-white rounded-3xl shadow-xl p-16 text-center'>
            <h2 className='text-3xl font-bold'>No trip booked yet</h2>
            <p>Start exploring destination
              around the world</p>
          </div>
        )}
        <div>
          {bookings.map((booking: any, index: number) => (
            <div key={index}
              className='bg-white rounded-[36px]
            shadow-xl overflow-hidden grid grid-cols-1
            md:grid-cols-4
            '
            >
              {/* left */}
              <div
                className='bg-blue-600 text-white
              p-8 flex flex-col justify-between
              '
              >
                <div>
                  <p className='text-sm opacity-80'>Flight Number</p>
                  <h2 className='text-4xl font-bold mt-2'>{booking.flight?.flightNumber || "AI202"}</h2>
                </div>
                <div className='mt-10'>
                  <p className='text-sm opacity-80'>Status</p>
                  <span className='inline-block mt-2 bg-green-400
                  text-black px-4 py-2 rounded-full font-semibold
                  '>Confirmed</span>
                </div>
              </div>
              {/* right */}
              <div className='md:col-span-3 p-8'>
                <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
                  {/* route */}
                  <div>
                    <p className='text-gray-500'>Route</p>
                    <h2 className='text-3xl font-bold mt-2'>
                      {booking.flight?.source || "DEL"}
                      {" → "}
                      {booking.flight?.destination || "BOM"}
                    </h2>
                  </div>
                  {/* seats */}
                  <div>
                    <p className='text-gray-500'>Seats</p>
                    <h2 className='text-2xl font-bold mt-2'>{booking.seats || "A1,A2"}</h2>
                  </div>
                  {/* price */}
                  <div>
                    <p className='text-gray-500'>Total</p>
                    <h2 className='text-3xl font-bold text-green-600 mt-2'>₹{booking.flight?.price || 5000}</h2>
                  </div>
                </div>
                {/* Bottom */}
                <div className='mt-10 border-t pt-6 flex flex-col md:flex-row
                justify-between items-center gap-4
                '>
                  <p className='text-gray-500'>Booking ID:{" "}
                    {booking.id}
                  </p>
                  <button className='
                  bg-blue-600 hover:bg-blue-700 px-4 py-2
                  rounded-2xl transition text-white
                  '
                    onClick={() => downloadTicket(booking)}
                  >Download Ticket</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BookingDetails