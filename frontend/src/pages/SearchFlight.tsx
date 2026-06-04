import { useState } from "react";
import api from "../api/axios"
import FlightCard from "../components/FlightCard";

const SearchFlight = () => {
    const [from, setfrom] = useState("");
    const [Flights, setFlights] = useState([])
    const [to, setto] = useState("");
    const [date, setdate] = useState("");
    const handlesearch = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await api.get("/flights/search", {
                params: {
                    from, to, date
                },
            });
            setFlights(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-6 py-16">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1
                    className="text-5xl font-bold tracking-tight text-gray-800"
                    >Search Flights</h1>
                    <p className="text-gray-500 mt-3 text-lg">Find the best flights at unbeatable prices</p>
                </div>
                <div
                className="bg-white/80
                backdrop-blur-lg
                shadow-2xl rounded-3xl p-6 border border-white/30
                "
                >
                    <form
                    className="grid grid-cols-1 md:grid-cols-4 gap-4"
                    onSubmit={handlesearch}>
                        <input type="text"
                        placeholder="from"
                        value={from}
                        onChange={(e)=>setfrom(e.target.value)}
                        className="bg-white
                        border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                        <input
                        placeholder="To"
                        value={to}
                        onChange={(e)=>setto(e.target.value)}
                        className="bg-white
                        border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition"
                        type="text" />
                        <input type="date" 
                        className="bg-white
                        border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition"
                        value={date}
                        onChange={(e)=>setdate(e.target.value)}
                        />
                        <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-600
                        text-white rounded-2xl p-4 font-semibold shadow-lg hover:shadow-2xl transition-all duration-300
                        "
                        >Search Flights</button>
                    </form>
                </div>
                <div
                className="mt-10 space-y-6"
                >{Flights.map((flight: any) => (
                    <FlightCard
                        key={flight.id}
                        id={flight.id}
                        flightNumber={flight.flightNumber}
                        source={flight.source}
                        destination={flight.destination}
                        departureTime={flight.departureTime}
                        arrivalTime={flight.arrivalTime}
                        price={flight.price}
                        availableSeats={flight.availableSeats}
                    />
                ))}</div>
            </div>
        </div>
    )
}

export default SearchFlight
//    <div className="max-w-4xl mx-auto mt-24">
//         <h1 className="text-3xl font-bold mb-6">Search Flights</h1>
//         <form
//         onSubmit={handlesearch}
//         className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <input type="text"
//             placeholder="from"
//             value={from}
//             onChange={(e)=>setfrom(e.target.value)}
//             className="border p-3 rounded-lg"
//             />
//             <input type="text"
//             placeholder="To"
//             value={to}
//             onChange={(e)=>setto(e.target.value)}
//             className="border p-3 rounded-lg"
//             />
//             <input type="date"
//             value={date}
//             onChange={(e)=>setdate(e.target.value)}
//             className="border p-3 rounded-lg"
//             />
//             <button type="submit"
//             className="bg-blue-600 text-white rounded-lg p-3"
//             >Submit</button>
//         </form>
//         <div>{Flights.map((flight:any)=>(
//             <FlightCard
//             key={flight.id}
//             id={flight.id}
//             flightNumber={flight.flightNumber}
//             source={flight.source}
//             destination={flight.destination}
//             departureTime={flight.departureTime}
//             arrivalTime={flight.arrivalTime}
//             price={flight.price}
//             availableSeats={flight.availableSeats}
//             />
//         ))}</div>
//     </div>