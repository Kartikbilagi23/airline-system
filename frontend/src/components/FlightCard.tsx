import { useNavigate } from "react-router-dom";
type FlightCardProps={
    id,
    flightNumber:string,
    source:string,
    destination:string,
    departureTime:string,
    arrivalTime:string,
    price:number,
    availableSeats:number;
};

const FlightCard=({
    id,
    flightNumber,
    source,
    destination,
    departureTime,
    arrivalTime,
    price,
    availableSeats,
}:FlightCardProps)=>{
const navigate=useNavigate()
    return (
        <div 
        className="bg-white rounded-2xl shadow-md p-6 transition-all
        duration-300 hover:shadow-2xl hover:-translate-y-1
         mt-8
        "
        >
            <div className="flex justify-between items-center">
                {/* left */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-blue-700">{flightNumber}</h2>
                    <div className="flex items-center gap-2 text-lg">
                        <span className="font-semibold">{source}</span>
                        <span>-</span>
                        <span className="font-semibold">{destination}</span>
                    </div>
                    <p className="text-gray-500">
                        Departure:{" "}
                        {new Date(departureTime).toLocaleTimeString()}
                    </p>
                    <p className="text-gray-500">
                        Arrival:{" "}
                        {new Date(arrivalTime).toLocaleTimeString()}
                    </p>
                </div>
                {/* Right */}
                <div className="text-right space-y-3">
                    <h3 className="text-2xl font-bold text-green-600">${price}</h3>
                    <p className="text-sm text-gray-500">Seats Left: {availableSeats}</p>
                    <button
                    className="bg-blue-600
                    hover:bg-blue-700
                    text-white
                    px-5
                    py-2
                    rounded-xl
                    transition
                    "
                    onClick={()=>navigate(`/bookings/${id}`)}
                    >Book Now</button>
                </div>
            </div>
        </div>
    )
}

export default FlightCard;