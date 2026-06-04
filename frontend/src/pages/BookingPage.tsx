import { useParams } from "react-router-dom"
import api from "../api/axios"
import SeatSelection from "../components/SelectSeats";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BookingPage = () => {
  const [flight, setflight] = useState<any>(null);
  const [selectedSeats, setselectedSeats] = useState<string[]>([])
  const [lockedSeats, setlockedSeats] = useState<string[]>([])
  const [bookedSeats, setbookedSeats] = useState<string[]>([])
  // const [checkavailable, setcheckavailable] = useState(0);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [loading, setloading] = useState(false)
  // const [seats, setseats] = useState(0);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchflight = async () => {
      try {
        const response = await api.get(`/flights/${id}`);
        setflight(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    // const fetchavailable = async () => {
    //   try {
    //     const res = await api.get(`/availableSeats/${id}`);
    //     setcheckavailable(res.data.availableSeats);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }

    fetchflight()
    // fetchavailable();
  }, [id])
  if (!flight) {
    return <p>Loading...</p>
  }
  const handlelockseat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    setloading(true);
    const payloadSeats = [...selectedSeats];
    try {
      console.log("FINAL", selectedSeats)
      const res = await api.post("/bookings/lock-seats", {
        flightId: id,
        selectedSeats: payloadSeats
      })
      setlockedSeats(payloadSeats);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    finally {
      setloading(false);
    }
  }
  // const lockedSeats = ["A1"];
  // const bookedSeats = ["B2"];
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="
      max-w-6xl
      mx-auto
      grid grid-cols-1 lg:grid-cols-3 gap-8
      ">
        {/* left */}
        <div className="lg:col-span-1">
          <div className="
          bg-white
          rounded-3xl p-6 sticky top-8
          ">
            <h2 
            className="text-2xl font-bold mb-6"
            >Flight Summary</h2>
            <div className="space-y-3">
              <p
              className="text-3xl font-bold text-blue-600" 
              >{flight.flightNumber}</p>
              <p
              className="text-xl"
              >{flight.source}{" → "}{flight.destination}</p>
              <p 
              className="text-gray-500"
              >Available Seats:{" "}{flight.availableSeats}</p>
              <div
              className="
              mt-6 border-t pt-4
              "
              >
                <p className="text-gray-500">Total Price</p>
                <p className="text-3xl font-bold text-green-600">
              ₹
              {flight.price *
                selectedSeats.length}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h1>Passenger Details</h1>
            <form
            onSubmit={handlelockseat}
            className="space-y-6"
            >
              <input type="text"
              value={name}
              onChange={(e)=>setname(e.target.value)}
              className="w-full
              border
              border-gray-200
              p-4
              rounded-2xl
              outline-none
              focus:ring-2
              focus:ring-blue-500
              "
              placeholder="Passenger Name"
              />
              <input type="email"
              value={email}
              onChange={(e)=>setemail(e.target.value)}
              className="
              w-full
              border
              border-gray-200
              p-4
              rounded-2xl
              outline-none
              focus:ring-2
              focus:ring-blue-500
              "
              placeholder="Passenger Email"
              />
              <div>
                <h2
                className="text-2xl font-bold mb-4"
                >Select Seats</h2>
                <SeatSelection
                  selectedSeats={selectedSeats}
                  setSelectedSeats={setselectedSeats}
                  lockedSeats={lockedSeats}
                  bookedSeats={bookedSeats}
                />
              </div>
              <button
              className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              py-4 rounded-2xl
              text-lg font-semibold transition-all duration-300 hover:shadow-2xl
              "
              onClick={()=>navigate('/checkout',{
                state:{
                  flight,
                  selectedSeats
                }
              })}

              >{loading?"Processing...":"Continue Booking"}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingPage
// <div className="max-w-3xl mx-auto p-6">
//   <h1 className="text-3xl font-bold mb-6">Confirm Bookings</h1>
//   <div className="border rounded-2xl p-6 shadow-md">
//     <h2 className="text-2xl font-bold">{flight.flightNumber}</h2>
//     <p className="mt-2">{flight.source}-{flight.destination}</p>
//     <p className="mt-2">Price: ${flight.price}</p>
//     <p className="mt-2">Available Seats: {flight.availableSeats}</p>
//   </div>
//   <form onSubmit={handlelockseat} className=" mt-8 space-y-4">
//     <input type="text"
//     value={name}
//     onChange={(e)=>setname(e.target.value)}
//     className="w-full border p-3 rounded-xl"
//     placeholder="Passenger Name"
//     />
//     <input type="email"
//     value={email}
//     onChange={(e)=>setemail(e.target.value)}
//     className="w-full border p-3 rounded-xl"
//     placeholder="Passenger Email"
//     />
//     {/* <input type="number"
//     min={1}
//     max={50}
//     value={seats}
//     onChange={(e)=>setseats(Number(e.target.value))}
//     className="w-full border p-3 rounded-xl"
//     placeholder="number"
//     /> */}
//     <SeatSelection
//     selectedSeats={selectedSeats}
//     setSelectedSeats={setselectedSeats}
//     lockedSeats={lockedSeats}
//     bookedSeats={bookedSeats}
//     />
//     <button
//     onClick={()=>navigate("/checkout",{
//       state:{
//         flight,
//         selectedSeats
//       }
//     })}
//     type="submit"
//     className="bg-blue-600
//     hover:bg-blue-500
//     px-6
//     py-2
//     text-white
//     rounded-xl
//     transition
//     "
//     disabled={loading}
//     >
//       {loading?"Processing":"Continue Booking"}
//     </button>
//   </form>
// </div>